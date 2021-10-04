import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

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
import * as ConnectionsReducer from './reducers/connections.reducer';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { FollowerListComponent } from './components/follower-list/follower-list.component';
import { FollowNewDialogComponent } from './components/follow-new-dialog/follow-new-dialog.component';
import { LinkerService } from './services/linker.service';
import { LinkerEffects } from './effects/linker.effects';
import { AddAuthenticationHeaderInterceptor } from './services/injector/add-auth-header.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarWrapperComponent,
    SignUpComponent,
    SignInComponent,
    WishListComponent,
    FollowerListComponent,
    FollowNewDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    NgHcaptchaModule.forRoot({
      siteKey: "fe40509e-a968-45c6-acfc-51f8578da2e8"
    }),
    StoreModule.forRoot({authentication: AuthenticationReducer.reducer,
                        connections: ConnectionsReducer.reducer}),
    EffectsModule.forRoot([AuthenticationEffects, LinkerEffects]),
    StoreDevtoolsModule.instrument({
      name: "WishlistSharer",
      maxAge: 25, // Retains last 25 states
      //logOnly: environment.production, // Restrict extension to log-only mode
      //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [AuthenticationService,
              LinkerService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AddAuthenticationHeaderInterceptor,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
