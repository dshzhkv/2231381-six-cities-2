import 'reflect-metadata';
import {OfferServiceInterface} from './offer-service.interface.js';
import {AppComponent} from '../../types/app-component.enum.js';
import OfferService from './offer.service.js';
import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(AppComponent.OfferServiceInterface).to(OfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(AppComponent.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
