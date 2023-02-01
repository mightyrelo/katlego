import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.css']
})
export class ArticleListPageComponent implements OnInit {

  public pageContent = {
    header: {
      title: 'Short Articles',
      strapline: ''
    },
    sideBar: {
      main: 'When I\'m bored I blog',
      sub: 'Blogging is a form of exercise, it helps me organize my thoughts and have a system of referral'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
