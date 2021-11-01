import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAuthToken, signOut } from 'src/app/actions/authentication.actions';
import { selectToken } from 'src/app/reducers/authentication.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar-wrapper',
  templateUrl: './toolbar-wrapper.component.html',
  styleUrls: ['./toolbar-wrapper.component.css']
})
export class ToolbarWrapperComponent implements OnInit {
  loggedIn: boolean = false;
  currentYear: Number = 2019
  showSidebarOption: boolean = true;

  constructor(private router: Router,
              private store: Store<any>,
              private snackBar: MatSnackBar) {
                
               }

  ngOnInit() {
    if(localStorage.getItem('token') != undefined) {
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      if (token != null) {
        this.store.dispatch(setAuthToken({token: token}))
      }
    }

    this.currentYear = (new Date()).getFullYear()

    this.store.select(selectToken)
                .subscribe((value => {
                  if (value.length > 0) {
                    this.loggedIn = true;
                    //this.snackBar.open("Logged in");
                  } else {
                    //this.snackBar.open("Logged out");
                    this.loggedIn = false;
                  }
                }));

  }

  logout() {
    this.store.dispatch(signOut());
    this.router.navigate(['/login']);
  }

}
