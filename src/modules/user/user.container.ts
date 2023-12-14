import 'reflect-metadata';
import { Container } from 'inversify';
import { UserServiceInterface } from './user-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import UserService from './user.service.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity.js';
import {Controller} from "../../core/controller/controller.abstract.js";
import UserController from "./user.controller.js";

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(AppComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(AppComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
