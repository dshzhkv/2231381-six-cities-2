import { City } from './city.enum';
import { Coordinates } from './coordinates.type';
import { Facility } from './facility.enum';
import { HousingType } from './housing-type.enum';

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
    authorId: string,
    commentsIds: string[],
    commentsNumber: number,
    coordinates: Coordinates
}
