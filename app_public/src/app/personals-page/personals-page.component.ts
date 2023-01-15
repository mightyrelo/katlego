import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personals-page',
  templateUrl: './personals-page.component.html',
  styleUrls: ['./personals-page.component.css']
})
export class PersonalsPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Personal Info',
      strapline: 'defining characteristics'
    },
    sideBar: {
      main: '',
      sub: 'click on name for more info'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
