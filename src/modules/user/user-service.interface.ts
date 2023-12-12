import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from "./dto/update-user.dto.js";
import {OfferEntity} from "../offer/offer.entity.js";

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  getFavourites(userId: string): Promise<DocumentType<OfferEntity>[]>
  addToFavorites(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;
  removeFromFavorites(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;
}
