import { createAction, props } from '@ngrx/store';

import { Post } from '../../shared/interfaces/post.interface';

export const get = createAction('[Feed Page] Get Feed');
export const getSuccess = createAction('[Feed API] Get Feed Success', props<{ posts: Post[] }>());
export const getFailure = createAction('[Feed API] Get Feed Failure', props<{ error: any }>());
