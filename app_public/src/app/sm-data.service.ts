import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SM } from './sm';
import { environment } from 'src/environments/environment';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class SmDataService {

  private apiBaseUrl = environment.apiBaseUrl;


  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public postSM(mId: string, formSm: SM) : Promise<SM> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    const url: string = `${this.apiBaseUrl}/ms/${mId}/sms`;
    return this.http
      .post(url, formSm, httpOptions)
      .toPromise()
      .then(response => response as SM)
      .catch(this.handleError);

  }

  public deleteSMByIds(mId: string, smId: string) : Promise<any> {
    
    const url: string = `${this.apiBaseUrl}/ms/${mId}/sms/${smId}`;
    console.log(url);
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  } 

  private handleError(error: any) : Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
