import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';

import {environment} from '../environments/environment';

import { Education } from './education';

@Injectable({
  providedIn: 'root'
})
export class EduDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public readEdus() : Promise<Education[]> {
    const url : string = `${this.apiBaseUrl}/educations`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Education[])
      .catch(this.handleError);

  }

  public addEdus(formEdus: Education) : Promise<Education> {
    const url: string = `${this.apiBaseUrl}/educations`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formEdus, httpOptions)
      .toPromise()
      .then(response => response as Education)
      .catch(this.handleError);
  }

  public getEdusById(eduId: string) : Promise<Education> {
    const url = `${this.apiBaseUrl}/educations/${eduId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Education)
      .catch(this.handleError);
  }

  public editEdus(pId: string, formPersonals: Education) : Promise<Education>{
    const url = `${this.apiBaseUrl}/educations/${pId}`;
    return this.http
      .put(url, formPersonals)
      .toPromise()
      .then(response => response as Education)
      .catch(this.handleError);
  }

  public deleteEdusById(persId: string) : Promise<any> {
    const url = `${this.apiBaseUrl}/personals/${persId}`;
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
