import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {OfferEntity} from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreate(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
