import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';

import {environment} from '../environments/environment';


import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public readContacts() : Promise<Contact[]> {
    const url : string = `${this.apiBaseUrl}/contacts`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Contact[])
      .catch(this.handleError);

  }

  public addContacts(formContacts: Contact) : Promise<Contact> {
    const url: string = `${this.apiBaseUrl}/contacts`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formContacts, httpOptions)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  public getContactsById(contactId: string) : Promise<Contact> {
    const url = `${this.apiBaseUrl}/contacts/${contactId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  public editContacts(contactId: string, formContacts: Contact) : Promise<Contact>{
    const url = `${this.apiBaseUrl}/contacts/${contactId}`;
    return this.http
      .put(url, formContacts)
      .toPromise()
      .then(response => response as Contact)
      .catch(this.handleError);
  }

  public deleteContactsById(contactsId: string) : Promise<any> {
    const url = `${this.apiBaseUrl}/contacts/${contactsId}`;
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
