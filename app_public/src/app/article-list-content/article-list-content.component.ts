import { Component, OnInit, Input } from '@angular/core';

import { Articles } from '../articles';
import { AuthenticationService } from '../authentication.service';
import { ArticlesDataService } from '../articles-data.service';



@Component({
  selector: 'app-article-list-content',
  templateUrl: './article-list-content.component.html',
  styleUrls: ['./article-list-content.component.css']
})
export class ArticleListContentComponent implements OnInit {
  public articles : Articles[];

  public formArticles = {
    _id: '',
    title: '',
    article: '',
    author: '',
    flaggedForDeletion: false,
    abstract: '',
    createdOn: '',

   };

  public openForm : boolean = false;

  public errorInForm : string = '';

  constructor(
    private authService: AuthenticationService,
    private artDataService: ArticlesDataService

  ) { }

  //create wrappers
  public readArticles(): void {
    
    this.artDataService.readArticles()
      .then((response) => {this.articles = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(aId: string) : void {
    for(let i=0; i < this.articles.length; i++) {
      if(this.articles[i]._id == aId) {
        console.log(aId, ' flagged');
        this.articles[i].flaggedForDeletion = true;
      } 
    }
  }

  public isFlagged(aId: string) : boolean {
    for(let i=0; i < this.articles.length; i++) {
      if(this.articles[i]._id == aId) {
        if(this.articles[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.articles.length; i++) {
      if(this.articles[i]._id == pId) {
        this.articles[i].flaggedForDeletion = false; 
      }
    }
  }

  public formIsValid() : boolean {
    if(!this.formArticles.title || !this.formArticles.article || this.formArticles.abstract) {
        return false;
      }
    else {
      return true;
    }
  }

  private getUserName() : string {
    const {name} = this.authService.getCurrentUser();
    return name ? name : 'Guest'
  }

  public onArticlesSubmit() : void {
    this.formArticles.author = this.getUserName();
    
    if(this.formIsValid()) {
      this.artDataService.addArticles(this.formArticles)
        .then(dBArt => {          
          let art = this.articles.slice(0);
          art.unshift(dBArt);
          this.articles = art;
          this.resetAndHideArticleForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.';
    }
  }

  public resetAndHideArticleForm() : void {
    this.formArticles.title = '';
    this.formArticles.article = '';
    this.formArticles.abstract = '';
    this.openForm = false;
    this.errorInForm = ''; 
  }

  public deleteArticles(pId: string) : void{
    this.artDataService.deleteArticlesById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readArticles()}});
  }

  ngOnInit() : void{
    this.readArticles();
  }

}
