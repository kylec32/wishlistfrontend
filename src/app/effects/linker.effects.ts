import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { searchUsers, searchUsersResponse } from '../actions/linker.actions';
import { LinkerService } from '../services/linker.service';

@Injectable()
export class LinkerEffects {
    searchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(searchUsers),
        switchMap((action) => {
            return this.linkerService.searchFollowers(action.userIdentitiferPrefix).pipe(
                map(response => searchUsersResponse({userOptions: response}))
            )
        })
    ))

    constructor(
        private actions$: Actions,
        private linkerService: LinkerService,
      ) {}
}
