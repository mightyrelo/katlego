import { Injectable,  Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { M } from './m';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class MDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public getMs() : Promise<M[]> {
    const path = '/ms';
    const url: string = `${this.apiBaseUrl}${path}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as M[])
      .catch(this.handleError);
  }

  public getMById(mId: string) : Promise<M> {
    const url : string = `${this.apiBaseUrl}/ms/${mId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as M)
      .catch(this.handleError);
  }

  public postM(formM: M) : Promise<M> {
    const url : string = `${this.apiBaseUrl}/ms`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formM, httpOptions)
      .toPromise()
      .then(response => response as M)
      .catch(this.handleError);
  }

  public deleteMById(mId: string) : Promise<null> {
    if(mId == null) {return null;}
    const url : string = `${this.apiBaseUrl}/ms/${mId}`;
    const httpOptions  = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }
  

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
