import typegoose, {defaultClasses, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';
import {City} from '../../types/city.enum.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {Facility} from '../../types/facility.enum.js';
import {Coordinates} from '../../types/coordinates.type.js';
import {UserEntity} from '../user/user.entity.js';
import mongoose from 'mongoose';

const { prop } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minLength: 10, maxLength: 100 })
  public title!: string;

  @prop({ required: true, minLength: 20, maxLength: 1024 })
  public description!: string;

  @prop({ required: true, set: (val: Date) => val.toISOString(), get: (val: string) => new Date(val), type: String })
  public publishDate!: Date;

  @prop({ required: true, set: (val: City) => val.toString(), get: (val: string) => val as City, type: String })
  public city!: City;

  @prop({ required: true, match: /^\w+.(jpg|png)$/ })
  public previewImage!: string;

  @prop({ required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavourite!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, type: () => String, enum: HousingType })
  public housingType!: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public roomsNumber!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guestsNumber!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, set: (val: Facility[]) => val.join(';'), get: (val: string) => val.split(';'), type: String })
  public facilities!: mongoose.Types.Array<Facility>;

  @prop({ required: true, ref: UserEntity })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true, set: (val: string[]) => val.join(';'), get: (val: string) => val.split(';'), type: String })
  public commentsIds!: string[];

  @prop({ required: true, set: (val: Coordinates) => `${val.latitude};${val.longitude}`, get: (val: string) => {
    const coordinates = val.split(';');
    return {latitude: coordinates[0], longitude: coordinates[1]};
  }, type: String})
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
