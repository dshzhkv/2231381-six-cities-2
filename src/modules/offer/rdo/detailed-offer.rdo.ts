import {Expose} from "class-transformer";
import {City} from "../../../types/city.enum.js";
import {HousingType} from "../../../types/housing-type.enum.js";
import {Facility} from "../../../types/facility.enum.js";
import {UserType} from "../../../types/user-type.enum.js";
import {Coordinates} from "../../../types/coordinates.type.js";

export class DetailedOfferRdo {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  publicationDate!: Date;

  @Expose()
  city!: City;

  @Expose()
  previewImage!: string;

  @Expose()
  images!: string[];

  @Expose()
  premium!: boolean;

  @Expose()
  favorite = true;

  @Expose()
  rating!: number;

  @Expose()
  housingType!: HousingType;

  @Expose()
  roomCount!: number;

  @Expose()
  guestCount!: number;

  @Expose()
  cost!: number;

  @Expose()
  facilities!: Facility[];

  @Expose()
  offerAuthor!: UserType;

  @Expose()
  commentsCount!: number;

  @Expose()
  coordinates!: Coordinates;
}
