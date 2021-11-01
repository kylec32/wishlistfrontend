import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signIn } from 'src/app/actions/authentication.actions';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;

  constructor(private snakBar: MatSnackBar,
              private _router: Router,
              private store: Store<any>,
              private authenticationService: AuthenticationService) { 
    this.email = "";
    this.password = "";
  }

  ngOnInit() {
    if(this.authenticationService.isLoggedIn()) {
      this._router.navigate(['/list']);
    }
  }

  signUp(){
    this._router.navigate(['/signup']);
  }

  login(){
    this.snakBar.open('Logging In', undefined, {
      duration: 2000,
    });

    this.store.dispatch(signIn({email: this.email, password: this.password}));

    this.clearForm();
    // this.authenticationService.login(this.email, this.password)
    //     .subscribe((loginResult) => {
    //       if(loginResult.found) {
    //         this.store.dispatch({type: LOGIN, payload: {token: loginResult.token}});
    //         this.snakBar.open('Logged In', null, {
    //           duration: 2000,
    //         });
    //         this._router.navigate(['/list']);
    //       } else {
    //         console.log("Invalid login");
    //         this.snakBar.open('Invalid Credentials', null, {
    //           duration: 2000,
    //         });
    //       }
          
    //       this.clearForm();
    //     }, (error) => {
    //       console.error(error);
    //       this.snakBar.open('Invalid Credentials', null, {
    //         duration: 2000,
    //       });
    //       this.clearForm();
    //     })
  }

  tryLogin(): void {
    if (this.allowSignIn()) {
      this.login();
    }
  }

  forgottenPassword(): void {
    this.snakBar.open("This isn't implemented yet", undefined, {duration: 2000});
  }

  allowSignIn(): boolean {
    return this.email != 'undefined' && this.email.length > 0 && this.password != 'undefined' && this.password.length > 0;
  }

  private clearForm() {
    this.password = '';
  }
}
