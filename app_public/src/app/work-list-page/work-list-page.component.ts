import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-list-page',
  templateUrl: './work-list-page.component.html',
  styleUrls: ['./work-list-page.component.css']
})
export class WorkListPageComponent implements OnInit {

  constructor() { }

  public pageContent = {
    header: {
      title: 'Work Experience',
      strapline: '2014 - Present'
    },
    sideBar: {
      main: 'I have never been formally employed.',
      sub: 'After dropping out of University in 2011 I started a business offering audio/video digitization services. After doing that for about a year I began another venture this time working with gate motors in 2014. In December 2015 I started free-lancing for an insurance company and have been there ever since.'
    }
  };

  ngOnInit() {
  }

}
