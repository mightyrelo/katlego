import { Inject, Injectable } from '@angular/core';


import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private userDataService: UserDataService
  ) { }

  private readToken() : string {
    return (this.storage.getItem('ppApp-token'));
  }

  private saveToken(token: string) : void {
    this.storage.setItem('ppApp-token', token);
  }


  public register(user: User) : Promise<any> {
    return this.userDataService.register(user)
      .then((authResp: AuthResponse) => console.log('new user registered.'));   
  }

  public login(user: User) : Promise<any> {
    return this.userDataService.login(user) 
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout() : void {
    this.storage.removeItem('ppApp-token');
  }

  public isLoggedIn() : boolean {
    const token: string = this.readToken();
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (payload.exp > (Date.now()/1000));
    }
    return false;
  }

  public getCurrentUser(): User {
    if(this.isLoggedIn()) {
      const token = this.readToken();
      const {name, email} = JSON.parse(atob(token.split('.')[1]));
      return {name, email} as User;
    }
  }
}

