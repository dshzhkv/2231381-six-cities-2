import {Cities, City} from '../../../types/city.enum.js';
import {HousingType} from '../../../types/housing-type.enum.js';
import {Facility} from '../../../types/facility.enum.js';
import {Coordinates} from '../../../types/coordinates.type.js';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum, IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export default class CreateOfferDto {
  @MinLength(10, {message: 'Min length for name is 10'})
  @MaxLength(100, {message: 'Max length for name is 100'})
  public title!: string;

  @MinLength(20, {message: 'Min length for description is 20'})
  @MaxLength(1024, {message: 'Max length for description is 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be a valid ISO string'})
  public publishDate!: Date;

  @IsEnum(Cities, {message: 'type must be one of the city'})
  public city!: City;

  @IsString({message: 'preview path is required.'})
  public previewImage!: string;

  @IsArray({message: 'field images must be an array'})
  @IsString({each: true, message: 'image path should be string'})
  public images!: string[];

  @IsBoolean({message: 'field premium must be boolean'})
  public isPremium!: boolean;

  @IsEnum(HousingType, {message: 'type must be one of the housing types'})
  public housingType!: HousingType;

  @Min(1, {message: 'Min count of rooms is 1'})
  @Max(8, {message: 'Max count of rooms is 8'})
  public roomsNumber!: number;

  @Min(1, {message: 'Min count of guests is 1'})
  @Max(10, {message: 'Max count of guests is 10'})
  public guestsNumber!: number;

  @Min(100, {message: 'Min cost is 100'})
  @Max(100000, {message: 'Max cost is 100000'})
  public price!: number;

  @IsArray({message: 'field facilities must be an array'})
  @IsEnum(Facility, {each: true, message: 'type must be one of the facilities'})
  @ArrayNotEmpty({message: 'There should be at least 1 facility'})
  public facilities!: Facility[];
  
  public authorId!: string;

  @IsObject({message: 'There should be object CoordinatesType'})
  public coordinates!: Coordinates;
}
