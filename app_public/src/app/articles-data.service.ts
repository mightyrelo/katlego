import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';


import { environment } from 'src/environments/environment';

import { Articles } from './articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public readArticles() : Promise<Articles[]> {
    const url : string = `${this.apiBaseUrl}/articles`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Articles[])
      .catch(this.handleError);

  }

  public addArticles(formArticles: Articles) : Promise<Articles> {
    const url: string = `${this.apiBaseUrl}/articles`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formArticles, httpOptions)
      .toPromise()
      .then(response => response as Articles)
      .catch(this.handleError);
  }

  public getArticlesById(artId: string) : Promise<Articles> {
    const url = `${this.apiBaseUrl}/articles/${artId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Articles)
      .catch(this.handleError);
  }

  public editArticle(aId: string, formArticles: Articles) : Promise<Articles>{
    const url = `${this.apiBaseUrl}/articles/${aId}`;
    return this.http
      .put(url, formArticles)
      .toPromise()
      .then(response => response as Articles)
      .catch(this.handleError);
  }

  public deleteArticlesById(aId: string) : Promise<any> {
    const url = `${this.apiBaseUrl}/articles/${aId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .delete(url,httpOptions)
      .toPromise()
      .then(res => res as any)
      .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }


}
