import { City } from './city.enum';
import { Coordinates } from './coordinates.type';
import { Facility } from './facility.enum';
import { HousingType } from './housing-type.enum';
import {User} from './user.type.js';

export type Offer = {
    title: string,
    description: string,
    publishDate: Date,
    city: City,
    previewImage: string,
    images: string[],
    isPremium: boolean,
    isFavourite: boolean,
    rating: number,
    housingType: HousingType,
    roomsNumber: number,
    guestsNumber: number,
    price: number,
    facilities: Facility[],
    author: User,
    commentsIds: string[],
    commentsNumber: number,
    coordinates: Coordinates
}
