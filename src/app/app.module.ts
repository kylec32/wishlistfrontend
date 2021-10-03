import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToolbarWrapperComponent } from './components/toolbar-wrapper/toolbar-wrapper.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { AuthenticationEffects } from './effects/authentication.effects';
import { AuthenticationService } from './services/authentication.service';

import * as AuthenticationReducer from './reducers/authentication.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarWrapperComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    NgHcaptchaModule.forRoot({
      siteKey: "fe40509e-a968-45c6-acfc-51f8578da2e8"
    }),
    StoreModule.forRoot({authentication: AuthenticationReducer.reducer}),
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreDevtoolsModule.instrument({
      name: "WishlistSharer",
      maxAge: 25, // Retains last 25 states
      //logOnly: environment.production, // Restrict extension to log-only mode
      //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
