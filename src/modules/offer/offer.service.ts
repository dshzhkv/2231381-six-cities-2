import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import {AppComponent} from '../../types/app-component.enum.js';
import {LoggerInterface} from '../../core/logger/logger.interface.js';
import {types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateOfferDto from './dto/create-offer.dto.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(offerId).exec();
  }

  public async findOrCreate(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const existingOffer = await this.findById(offerId);
    return existingOffer ?? await this.create(dto);
  }
}
