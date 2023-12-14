import {IsInt, IsMongoId, IsNotEmpty, IsString, Length, Max, Min} from "class-validator";

export default class CreateCommentDto {
  @IsString({message: 'Text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsMongoId({message: 'OfferId field must be a valid id'})
  public offerId!: string;

  public authorId!: string;

  @IsInt({message: 'rating should be an integer.'})
  @IsNotEmpty({message: 'rating is required.'})
  @Min(1, {message: 'Min value for rating is 1.'})
  @Max(10, {message: 'Max value for rating is 10.'})
  public rating!: number;
}
