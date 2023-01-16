import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';

import {environment} from '../environments/environment';


import { Work } from './work';

@Injectable({
  providedIn: 'root'
})
export class WorkDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public readWorks() : Promise<Work[]> {
    const url : string = `${this.apiBaseUrl}/works`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Work[])
      .catch(this.handleError);

  }

  public addWorks(formWorks: Work) : Promise<Work> {
    const url: string = `${this.apiBaseUrl}/works`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formWorks, httpOptions)
      .toPromise()
      .then(response => response as Work)
      .catch(this.handleError);
  }

  public getWorksById(workId: string) : Promise<Work> {
    const url = `${this.apiBaseUrl}/works/${workId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Work)
      .catch(this.handleError);
  }

  public editWorks(workId: string, formWorks: Work) : Promise<Work>{
    const url = `${this.apiBaseUrl}/works/${workId}`;
    return this.http
      .put(url, formWorks)
      .toPromise()
      .then(response => response as Work)
      .catch(this.handleError);
  }

  public deleteWorksById(worksId: string) : Promise<any> {
    const url = `${this.apiBaseUrl}/works/${worksId}`;
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
