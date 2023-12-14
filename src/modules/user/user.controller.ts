import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {AppComponent} from "../../types/app-component.enum.js";
import {Controller} from "../../core/controller/controller.abstract.js";
import {LoggerInterface} from "../../core/logger/logger.interface.js";
import {UserServiceInterface} from "./user-service.interface.js";
import {ConfigInterface} from "../../core/config/config.interface.js";
import {HttpMethod} from "../../types/http-method.enum.js";
import CreateUserDto from "./dto/create-user.dto.js";
import HttpError from "../../core/errors/http-error.js";
import {StatusCodes} from "http-status-codes";
import {fillDTO} from "../../core/helpers/common.js";
import LoginDto from "./dto/login.dto.js";
import UserRdo from "./rdo/user.rdo.js";
import {RestSchema} from "../../core/config/rest.schema.js";
import {DetailedOfferRdo} from "../offer/rdo/detailed-offer.rdo.js";


@injectable()
export default class UserController extends Controller {
  constructor(@inject(AppComponent.LoggerInterface) logger: LoggerInterface,
              @inject(AppComponent.OfferServiceInterface) private readonly userService: UserServiceInterface,
              @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/register', method: HttpMethod.Get, handler: this.register});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Post, handler: this.addFavorite});
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorite});
    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.getFavorite});
  }

  public async register(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async getFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {userId: string}>, _res: Response): Promise<void> {
    const result = await this.userService.getFavourites(body.userId);
    this.ok(_res, fillDTO(DetailedOfferRdo, result));
  }

  public async addFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {offerId: string, userId: string}>, res: Response): Promise<void> {
    await this.userService.addToFavorites(body.offerId, body.userId);
    this.noContent(res, {message: 'Предложение добавлено в избранное'});
  }

  public async deleteFavorite({body}: Request<Record<string, unknown>, Record<string, unknown>, {offerId: string, userId: string}>, res: Response): Promise<void> {
    await this.userService.removeFromFavorites(body.offerId, body.userId);
    this.noContent(res, {message: 'Предложение удалено из избранного'});
  }
}
