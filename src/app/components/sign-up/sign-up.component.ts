import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  signUp, signUpFailure, signUpSuccess,
  signIn
} from '../../actions/authentication.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {

  emailAddress: string = "aa";
  password: string = "bbb";
  passwordAgain: string = "bbb";
  firstName:string = "dd";
  lastName:string = "ee";
  private captchaResponse: string = "";
  private destroyed$ = new Subject<boolean>();

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private store: Store,
              private updates$: Actions
              ) { 
                this.updates$.pipe(
                  ofType(signUpSuccess),
                  takeUntil(this.destroyed$)
                )
                .subscribe(() => {
                  this.snackBar.open("Setting Up Your Account...", undefined, {
                    duration: 5000
                  });

                  setTimeout(() => {
                    this.store.dispatch(signIn({email: this.emailAddress, password: this.password}))
                  }, 5000);
                });

                this.updates$.pipe(
                  ofType(signUpFailure),
                  takeUntil(this.destroyed$)
                )
                .subscribe((action) => {
                  console.log(action);
                  this.snackBar.open("An issue occurred signing up...", undefined, {
                    duration: 2000
                  });
                });
              }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  canSignUp(): boolean {
    return this.firstName.length > 0
            && this.lastName.length > 0
            && this.emailAddress.length > 0
            && this.password.length > 0
            && this.passwordAgain === this.password
            && this.captchaResponse.length > 0;
  }

  signUp():void {
    this.snackBar.open("Signing Up", undefined, {
      duration: 2000
    });
    this.store.dispatch(signUp({firstName: this.firstName, lastName: this.lastName, emailAddress: this.emailAddress, password: this.password, captchaResponse: this.captchaResponse}));
  }

  onVerify(token: string) {
    this.captchaResponse = token;
  }

  onExpired(response: any) {
    this.captchaResponse = "";
  }

  onError(error: any) {
    console.log("Error");
    console.log(error);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
    this.captchaResponse = captchaResponse;
  }

  private clearForm(): void {
    this.firstName = "";
    this.lastName = "";
    this.emailAddress = "";
    this.password = "";
    this.passwordAgain = "";
    this.captchaResponse = "";
  }

}
