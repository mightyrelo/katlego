import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from './storage';

import {environment} from '../environments/environment';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public readProjects() : Promise<Project[]> {
    const url : string = `${this.apiBaseUrl}/projects`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Project[])
      .catch(this.handleError);

  }

  public addProjects(formProjects: Project) : Promise<Project> {
    const url: string = `${this.apiBaseUrl}/projects`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('ppApp-token')}`
      })
    };
    return this.http
      .post(url, formProjects, httpOptions)
      .toPromise()
      .then(response => response as Project)
      .catch(this.handleError);
  }

  public getProjectsById(projectId: string) : Promise<Project> {
    const url = `${this.apiBaseUrl}/projects/${projectId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Project)
      .catch(this.handleError);
  }

  public editProjects(projectId: string, formProjects: Project) : Promise<Project>{
    const url = `${this.apiBaseUrl}/projects/${projectId}`;
    return this.http
      .put(url, formProjects)
      .toPromise()
      .then(response => response as Project)
      .catch(this.handleError);
  }

  public deleteProjectsById(projectsId: string) : Promise<any> {
    const url = `${this.apiBaseUrl}/projects/${projectsId}`;
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
