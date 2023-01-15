import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  public doLogout(): void {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName(): string {
    const user: User = this.authService.getCurrentUser();
    return user ? user.name : 'Guest';
  }

  ngOnInit() {
  }

}
