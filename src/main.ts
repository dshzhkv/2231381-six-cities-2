import 'reflect-metadata';
import RestApplication from './app/rest.js';
import {Container} from 'inversify';
import {AppComponent} from './types/app-component.enum.js';
import {createRestApplicationContainer} from './app/rest.container.js';
import {createUserContainer} from './modules/user/user.container.js';
import {createOfferContainer} from './modules/offer/offer.container.js';

async function bootstrap() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );
  const application = container.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();
