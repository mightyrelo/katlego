import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Katlego Gagoopane',
      strapline: 'Full Stack Web Developer'
    },
    sideBar: {
      main: 'I learned to code by working on applications that I found useful in my life and career.',
      sub: 'Through this process of \'learning by creating \' I have come to gain a good grasp of the C-family of languages. The languages I\'ve worked with in the past include C++, Java, PHP, Javascript and C#. I\'m also proficient at working with both SQL and NoSQL databases.'
    }
  };


  constructor() { }

  ngOnInit() {
  }

}
