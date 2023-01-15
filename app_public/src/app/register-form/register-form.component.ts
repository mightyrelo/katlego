import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  public formError = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private historyService: HistoryService
  ) { }

  public onRegisterSubmit() : void {
    console.log('hello');
    if(!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'all fields required, leka gape!';
      return;
    }
    this.authService.register(this.credentials)
      .then(() => {this.router.navigateByUrl(this.historyService.getPreviousUrl()); console.log('last', this.historyService.getPreviousUrl())})
      .catch((message) => this.formError = message);
  }

  ngOnInit() {
  }

}
