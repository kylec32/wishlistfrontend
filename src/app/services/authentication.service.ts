import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseHttpService {

  constructor(private httpClient:HttpClient) {
    super();
   }

  // signUp(): Observable<any> {
  //   return of("")
  //   //return new Observable.of()
  // }
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
