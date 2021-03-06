import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Post } from '../shared/interfaces/post.interface';
import { PostService } from './post.service';
import * as PostActions from './state/post.actions';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {
  constructor(private readonly store: Store, private readonly postService: PostService) {}

  getFromApi(id: string) {
    return this.postService
      .get(id)
      .pipe(tap((post) => this.store.dispatch(PostActions.loaded({ post }))));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    return this.getFromApi(route.params['id']).pipe(
      catchError(() => {
        // this.router.navigate(['/404'], { skipLocationChange: true });
        return of(null);
      }),
    );
  }
}
