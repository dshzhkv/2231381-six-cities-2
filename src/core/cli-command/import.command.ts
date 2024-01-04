import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createOffer} from '../helpers/offers.js';
import {UserServiceInterface} from '../../modules/user/user-service.interface.js';
import {OfferServiceInterface} from '../../modules/offer/offer-service.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {DatabaseClientInterface} from '../database-client/database-client.interface.js';
import {Offer} from '../../types/offer.type.js';
import {getMongoURI} from '../helpers/db.js';
import PinoService from '../logger/pino.service.js';
import OfferService from '../../modules/offer/offer.service.js';
import {OfferModel} from '../../modules/offer/offer.entity.js';
import UserService from '../../modules/user/user.service.js';
import {UserModel} from '../../modules/user/user.entity.js';
import MongoClientService from '../database-client/mongo-client.service.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new PinoService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  public async execute(filename: string, login: string, password: string, host: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(error) {
      this.logger.error(`Can't read the file: ${(error as Error)?.message || ''}`);
    }
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      authorId: author.id
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows imported.`);
    void this.databaseService.disconnect();
  }
}
