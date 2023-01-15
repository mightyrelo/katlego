import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edu-list-page',
  templateUrl: './edu-list-page.component.html',
  styleUrls: ['./edu-list-page.component.css']
})
export class EduListPageComponent implements OnInit {

public pageContent = {
    header: {
      title: 'Academic Background',
      strapline: ''
    },
    sideBar: {
      main: 'Katlego holds a Bachelor\'s Degree in Electrical Engineering obtained from the University of the Witwatersrand in Johannesburg, South Africa.',
      sub: 'Varsity was tough but my three major take aways are principlies of Control Systems, Software Development and Electromagnetics. In my final year I worked on two projects i) Dc motor controller ii) Dual-band 5G Antenna Design'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
