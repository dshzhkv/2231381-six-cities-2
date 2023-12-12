import {User} from '../../types/user.type.js';
import typegoose, {defaultClasses, getModelForClass, modelOptions} from '@typegoose/typegoose';
import {UserType} from '../../types/user-type.enum.js';
import {createSHA256} from '../../core/helpers/common.js';

const { prop } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

const DEFAULT_AVATAR_PATH = './default-avatar.jpg';

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minLength: 1, maxLength: 15 })
  public name: string;

  @prop({ unique: true, required: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })
  public email: string;

  @prop({ required: false, match: /^\w+.(jpg|png)$/, default: DEFAULT_AVATAR_PATH })
  public avatarPath: string;

  @prop({ required: true })
  private password!: string;

  @prop({ required: true, type: () => String, enum: UserType, default: UserType.Usual })
  public type: UserType;

  @prop({ required: true, type: () => String })
  public favorites!: string[];

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath ?? DEFAULT_AVATAR_PATH;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
