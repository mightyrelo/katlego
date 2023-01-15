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
      main: 'I\'m a self-taught developer who learned to code by working on applications that I found useful in my life and career.',
      sub: 'For me it was never really about learning a new language. It was about setting an objective and learning everything that needs to be learned to see that goal through. It was through this process of \'learning by creating \' I have come to gain a good grasp of the C-family of languages. The languages I have worked with in the past include C++, Java, PHP, Javascript and C#. I\'m also proficient at working with both SQL and NoSQL databases, using Git, deploying Express and Apache web applications on live environments'
    }
  };


  constructor() { }

  ngOnInit() {
  }

}
