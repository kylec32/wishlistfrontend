import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseHttpService {

  private helper:JwtHelperService = new JwtHelperService();

  constructor(private httpClient:HttpClient) {
    super();
   }

   isLoggedIn():boolean {
    let currentToken = localStorage.getItem('token')
    return localStorage.getItem('token') != undefined
            && localStorage.getItem('token') != null
            && localStorage.getItem('token')!.length > 0
            && !this.helper.isTokenExpired(currentToken ? currentToken : '');
  }

  signUp(firstName:String, lastName:String, emailAddress:String, password:String, captcha: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/sign-up`,
                                  {
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "emailAddress": emailAddress,
                                    "username": emailAddress,
                                    "password": password,
                                    "captcha": captcha
                                  },
                                  { observe: 'response' }
                                );
  }

  login(emailAddress: String, password: String):Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/sign-in`,
                                  {
                                    "emailAddress": emailAddress,
                                    "password": password
                                  });
  }
}
