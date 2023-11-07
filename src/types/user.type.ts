import { UserType } from './user-type.enum';

export type User = {
    name: string,
    email: string,
    avatarPath?: string,
    type: UserType
};
