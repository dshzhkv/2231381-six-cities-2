import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {AppComponent} from "../../types/app-component.enum.js";
import {LoggerInterface} from "../../core/logger/logger.interface.js";
import {CommentServiceInterface} from "./comment-service.interface.js";
import {Controller} from "../../core/controller/controller.abstract.js";
import {HttpMethod} from "../../types/http-method.enum.js";
import CreateCommentDto from "./dto/create-comment.dto.js";
import {fillDTO} from "../../core/helpers/common.js";
import {CommentRdo} from "./rdo/comment.rdo.js";


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create});
  }

  public async create({body}: Request<object, object, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
