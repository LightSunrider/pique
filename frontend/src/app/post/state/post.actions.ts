import { createAction, props } from '@ngrx/store';

import { IError } from '../../shared/interfaces';
import { Post } from '../../shared/interfaces/post.interface';

export const loaded = createAction('[Post Resolver] Post Loaded', props<{ post: Post }>());

export const like = createAction('[Post Page] Post Liked', props<{ post: Post }>());
export const likeSuccess = createAction('[Post Api] Post Like Success', props<{ post: Post }>());
export const likeFailure = createAction(
  '[Post Api] Post Like Failure',
  props<{ post: Post; error: IError }>(),
);

export const unlike = createAction('[Post Page] Post Unliked', props<{ post: Post }>());
export const unlikeSuccess = createAction(
  '[Post Api] Post Unlike Success',
  props<{ post: Post }>(),
);
export const unlikeFailure = createAction(
  '[Post Api] Post Unlike Failure',
  props<{ post: Post; error: IError }>(),
);
