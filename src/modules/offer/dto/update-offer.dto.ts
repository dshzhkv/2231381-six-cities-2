import {City} from '../../../types/city.enum.js';
import {HousingType} from '../../../types/housing-type.enum.js';
import {Facility} from '../../../types/facility.enum.js';
import {Coordinates} from '../../../types/coordinates.type.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publishDate?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavourite?: boolean;
  public rating?: number;
  public housingType?: HousingType;
  public roomsNumber?: number;
  public guestsNumber?: number;
  public price?: number;
  public facilities?: Facility[];
  public authorId?: string;
  public commentsIds?: string[];
  public commentsNumber?: number;
  public coordinates?: Coordinates;
}
