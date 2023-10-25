import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import {Cities, City} from '../../types/city.enum.js';
import {
  generateId,
  generateRandomBoolean,
  generateRandomNumber,
  getRandomItem,
  getRandomItems
} from '../../core/helpers/random.js';
import {HousingType} from '../../types/housing-type.enum.js';
import {Facility} from '../../types/facility.enum.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<City>(Object.keys(Cities));
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = generateRandomBoolean();
    const isFavourite = generateRandomBoolean();
    const rating = generateRandomNumber(1, 5);
    const housingType = getRandomItem<HousingType>(Object.values(HousingType));
    const roomsNumber = generateRandomNumber(1, 8);
    const guestsNumber = generateRandomNumber(1, 10);
    const price = generateRandomNumber(100, 100000);
    const facilities = getRandomItems<string>(Object.values(Facility)).join(';');
    const authorId = generateId();
    const commentsNumber = generateRandomNumber(1, 100);
    const commentsIdsArray = [];
    for (let i = 0; i < commentsNumber; i++) {
      commentsIdsArray.push(generateId());
    }
    const commentsIds = commentsIdsArray.join(';');
    const coordinates = `${Cities[city].latitude};${Cities[city].longitude}`;

    return [
      title, description, publishDate, city, previewImage, images, isPremium, isFavourite, rating, housingType, roomsNumber, guestsNumber, price, facilities, authorId, commentsIds, coordinates
    ].join('\t');
  }
}
