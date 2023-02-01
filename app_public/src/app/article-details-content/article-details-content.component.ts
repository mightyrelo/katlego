import { Component, OnInit, Input } from '@angular/core';



import { Articles } from '../articles';
import { AuthenticationService } from '../authentication.service';
import { ArticlesDataService } from '../articles-data.service';

@Component({
  selector: 'app-article-details-content',
  templateUrl: './article-details-content.component.html',
  styleUrls: ['./article-details-content.component.css']
})
export class ArticleDetailsContentComponent implements OnInit {

  @Input() dbArt : Articles

  public formArticle = {
    _id: '',
    title: '',
    abstract: '',
    author: null,
    article: '',
    flaggedForDeletion: false,
  };

  public openForm : boolean = false;

  public errorInForm : string = '';

  public pageContent = {
    header: {
      title: '',
      strapline: 'Details of a specific article',
    },
    sideBar: {
      main: 'article details',
      sub: 'details for a specific article'
    }
  };

  constructor(
    private authService: AuthenticationService,
    private artDataService: ArticlesDataService
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    const {name} = this.authService.getCurrentUser();
    return name ? name : 'Guest'
  }

  public onArticleSubmit(aId: string) : void {
    this.formArticle.author = this.getUserName();
    this.artDataService.editArticle(aId, this.formArticle)
      .then(dbArt => {
        console.log(dbArt);
        this.resetAndHideArticleForm(); 
        this.dbArt = dbArt;
      });
  }

  public resetAndHideArticleForm() : void {
    this.formArticle.title = '';
    this.formArticle.author = '';
    this.formArticle.abstract = '';
    this.formArticle.article = '';
    this.formArticle._id = '';
    this.formArticle.flaggedForDeletion = false;
    this.openForm = false;
    this.errorInForm = ''; 
  }



  ngOnInit() {
  }

}
