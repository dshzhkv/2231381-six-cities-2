import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentServiceInterface} from './comment-service.interface.js';
import {AppComponent} from "../../types/app-component.enum";
import {CommentEntity, CommentModel} from "./comment.entity";
import CommentService from "./comment.service";

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentServiceInterface>(AppComponent.CommentServiceInterface).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(AppComponent.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
