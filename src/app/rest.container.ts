import 'reflect-metadata';
import PinoService from '../core/logger/pino.service.js';
import RestApplication from './rest.js';
import ConfigService from '../core/config/config.service.js';
import {Container} from 'inversify';
import {AppComponent} from '../types/app-component.enum.js';
import {LoggerInterface} from '../core/logger/logger.interface.js';
import {ConfigInterface} from '../core/config/config.interface.js';
import {RestSchema} from '../core/config/rest.schema.js';
import {DatabaseClientInterface} from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';
import {ExceptionFilterInterface} from "../core/exception-filters/exception-filter.interface.js";
import ExceptionFilter from "../core/exception-filters/exception-filter.js";

export function createRestApplicationContainer() {
  const container = new Container();

  container.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  container.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

  return container;
}
