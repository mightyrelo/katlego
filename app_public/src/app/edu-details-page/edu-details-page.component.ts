import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edu-details-page',
  templateUrl: './edu-details-page.component.html',
  styleUrls: ['./edu-details-page.component.css']
})
export class EduDetailsPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Academic Info',
      strapline: 'what qualifications do you have?'
    },
    sideBar: {
      main: 'academic history',
      sub: 'qualifications performed working at certain institution'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
