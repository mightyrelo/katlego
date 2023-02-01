import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { Articles } from '../articles';
import { ArticlesDataService } from '../articles-data.service';

@Component({
  selector: 'app-article-details-page',
  templateUrl: './article-details-page.component.html',
  styleUrls: ['./article-details-page.component.css']
})
export class ArticleDetailsPageComponent implements OnInit {

  public dbArt: Articles

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: ''
    }
  };

  constructor(
    private artDataService: ArticlesDataService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() : void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('articleId');
          return this.artDataService.getArticlesById(id);
        })
      )
      .subscribe((newArt: Articles) => {
        this.dbArt = newArt;
        this.pageContent.header.title = newArt.title;
        this.pageContent.sideBar.main = `${newArt.title} `;
        this.pageContent.sideBar.sub = `${newArt.abstract}`;
      })
  }

}
