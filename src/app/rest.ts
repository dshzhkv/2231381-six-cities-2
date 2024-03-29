import {LoggerInterface} from '../core/logger/logger.interface.js';
import {ConfigInterface} from '../core/config/config.interface.js';
import {RestSchema} from '../core/config/rest.schema.js';
import {AppComponent} from '../types/app-component.enum.js';
import {inject, injectable} from 'inversify';
import {DatabaseClientInterface} from '../core/database-client/database-client.interface.js';
import {getMongoURI} from '../core/helpers/db.js';
import express, {Express} from "express";
import {ControllerInterface} from "../core/controller/controller.interface.js";
import {ExceptionFilterInterface} from "../core/exception-filters/exception-filter.interface.js";
import {AuthenticateMiddleware} from "../core/middleware/authenticate.middleware.js";

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
    @inject(AppComponent.ExceptionFilterInterface) private readonly exceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    this.logger.info('Init database…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT')
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('Init database completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server…');

    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`🚀Server started on http://localhost:${this.config.get('PORT')}`);
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization…');
    this.expressApplication.use(express.json());
    this.expressApplication.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.logger.info('Global middleware initialization completed');
  }


  private async _initRoutes() {
    this.logger.info('Controller initialization…');
    this.expressApplication.use('/categories', this.offerController.router);
    this.logger.info('Controller initialization completed');
  }

  private async _initExceptionFilters() {
    this.logger.info('Exception filters initialization');
    this.expressApplication.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters completed');
  }

  public async init() {
    this.logger.info('Application initialization…');

    await this._initDb();
    await this._initMiddleware();
    await this._initRoutes();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
