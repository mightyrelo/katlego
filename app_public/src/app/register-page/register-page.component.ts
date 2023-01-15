import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Sign up to use ppApp',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: 'enter credentials'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
