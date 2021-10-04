import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { signIn, signInFailure, signInInvalid, signInSuccess, signOut, signUp, signUpFailure, signUpSuccess  } from '../actions/authentication.actions';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

 
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
        return this.authenticationService.login(action.email, action.password).pipe(
            map(response => {
                if (response.found) {
                    return signInSuccess({token: response.token})
                } else {
                    return signInInvalid()
                }
                }),
            catchError(error => of(signInFailure({error: error})))
        )
    })
)
);

signInValid$ = createEffect(() => this.actions$.pipe(
    ofType(signInSuccess),
    map(action => {
        this.snackBar.open("Logged In", undefined, {duration: 2000});
        this.router.navigate(['/list'])
    })
),
{
    dispatch: false
})

signInInvalid$ = createEffect(() => this.actions$.pipe(
    ofType(signInInvalid),
    map(action => {
        this.snackBar.open("Invalid credentials, try again", undefined, {duration: 2000});
    })
),
{
    dispatch: false
})

signInInvalid2$ = createEffect(() => this.actions$.pipe(
    ofType(signInFailure),
    map(action => {
        this.snackBar.open("Invalid credentials, try again", undefined, {duration: 2000});
    })
),
{
    dispatch: false
})

handleTokenStorage$ = createEffect(() => this.actions$.pipe(
    ofType(signInSuccess),
    map((action) => {
        localStorage.setItem('authToken', action.token);
    })
),
{
    dispatch: false
});

handleTokenStorageRemoval = createEffect(() => this.actions$.pipe(
    ofType(signOut),
    map(() => {
        localStorage.setItem('authToken', "");
        return of("");
    })
),
{
    dispatch: false
});
 
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
}