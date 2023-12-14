import {Length} from "class-validator";

export default class UpdateUserDto {
  @Length(1, 15, {message: 'Username length should be from 1 to 15.'})
  public name?: string;
  public avatarPath?: string;
}
