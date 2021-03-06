import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ToolbarWrapperComponent } from './components/toolbar-wrapper/toolbar-wrapper.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: '', component: ToolbarWrapperComponent,
  children: [
    { path: 'login', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    // { path: 'reset/:email/:token', component: ForgottenPasswordComponent },
    { path: 'list',
      component: WishListComponent, 
    //   canActivate: [CanActivateViaAuthGuard]
    }
  ]},
  { path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
