import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { signIn, signInFailure, signInSuccess, signUp, signUpFailure, signUpSuccess  } from '../actions/authentication.actions';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';

 
@Injectable()
export class AuthenticationEffects {

signUp$ = createEffect(() => this.actions$.pipe(
    ofType(signUp),
    exhaustMap((action) => {
        console.log(action);
        return this.authenticationService.signUp(action.firstName, action.lastName, action.emailAddress, action.password, action.captchaResponse).pipe(
            map(response => signUpSuccess()),
            catchError(error => of(signUpFailure({error: error})))
        )
      }
    )
  )
);

login$ = createEffect(() => this.actions$.pipe(
    ofType(signIn),
    exhaustMap((action) => {
        console.log(action);
        return this.authenticationService.login(action.email, action.password).pipe(
            map(response => signInSuccess({token: response.token})),
            catchError(error => of(signInFailure({error: error})))
        )
    })
))
 
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}