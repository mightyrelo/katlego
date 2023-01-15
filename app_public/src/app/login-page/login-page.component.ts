import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Log into ppApp',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: 'log in to access secure routes'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
