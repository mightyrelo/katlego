import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.css']
})
export class ContactListPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Contact Info',
      strapline: 'what contacts have you worked on in the past?'
    },
    sideBar: {
      main: 'contacts history',
      sub: 'roles performed working at certain company'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
