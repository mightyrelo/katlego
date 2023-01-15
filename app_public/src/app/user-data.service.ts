import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User) : Promise<AuthResponse>  {
   return this.makeAuthApiCall('register', user);
  }

  public login(user: User) : Promise<AuthResponse>  {
    return this.makeAuthApiCall('login', user);
  }

  private makeAuthApiCall(path: string, user: User) {
    const url : string = `${this.apiBaseUrl}/${path}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);

  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }


}
