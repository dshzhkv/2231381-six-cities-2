import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import {Expose} from "class-transformer";

export class OfferRdo {
  @Expose()
  title!: string;
  @Expose()
  publishDate!: Date;
  @Expose()
  city!: City;
  @Expose()
  previewImage!: string;
  @Expose()
  isPremium!: boolean;
  @Expose()
  isFavourite!: boolean;
  @Expose()
  rating!: number;
  @Expose()
  housingType!: HousingType;
  @Expose()
  price!: number;
  @Expose()
  commentsNumber!: number
}
