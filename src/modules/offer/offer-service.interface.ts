import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {OfferEntity} from './offer.entity.js';
import UpdateOfferDto from "./dto/update-offer.dto.js";

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreate(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  countComments(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  countRating(offerId: string, rating: number): Promise<void>;
  find(count: number | undefined): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
