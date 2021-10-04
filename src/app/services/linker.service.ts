import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { Follower } from '../models/follower.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkerService extends BaseHttpService {

  constructor(private httpClient:HttpClient) {
    super()
   }

   searchFollowers(emailAddressSearch: string):Observable<Follower[]> {
    return this.httpClient.get<Follower[]>(`${this.BASE_URL}/users/${emailAddressSearch}`);
  }
}
