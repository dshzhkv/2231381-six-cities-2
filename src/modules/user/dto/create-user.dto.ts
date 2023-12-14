import {UserType} from '../../../types/user-type.enum.js';
import {IsEmail, IsEnum, IsString, Length} from "class-validator";

export default class CreateUserDto {
  @Length(1, 15, {message: 'Username length should be from 1 to 15.'})
  @IsString({message: 'Username is required.'})
  public name!: string;

  @IsEmail({}, {message: 'Email must be valid.'})
  @IsString({message: 'Email is required.'})
  public email!: string;

  @Length(6, 12, {message: 'Password length should be from 6 to 12.'})
  @IsString({message: 'Password is required.'})
  public password!: string;

  @IsEnum(UserType, {message: 'Type must be one of the user type'})
  public type!: UserType;
}
