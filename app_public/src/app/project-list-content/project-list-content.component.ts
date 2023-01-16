import { Component, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-project-list-content',
  templateUrl: './project-list-content.component.html',
  styleUrls: ['./project-list-content.component.css']
})
export class ProjectListContentComponent implements OnInit {

  public projects: Project[];

  public formProjects = {
    _id: '',
    name: '',
    description: '',
    descriptionFull: '',
    term: '',
    tools: [],
    concepts: [],
    language: '',
    userId: '',
    flaggedForDeletion: false,
    flaggedForDesc: false,
    link: '',
    github: '',
    passport: '',
    license: ''
  };

  public openForm : boolean = false;
  public openDesc: boolean = false;

  public errorInForm : string = '';


  constructor(
    private projectDataService: ProjectDataService,
    private authService: AuthenticationService
  ) { }

  //create wrappers
  public readProjects(): void {
    
    this.projectDataService.readProjects()
      .then((response) => {this.projects = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(pId: string) : void {
    for(let i=0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        this.projects[i].flaggedForDeletion = true;
      } 
    }
  }

  public setShowFlag(pId: string) : void {
    this.openDesc = true;
    for(let i = 0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        this.projects[i].flaggedForDesc = true;
      }
    }
  }

  public isFlagged(pId: string) : boolean {
    for(let i=0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        if(this.projects[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public isFlaggedForShow(pId: string) : boolean {
    for(let i=0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        if(this.projects[i].flaggedForDesc) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        this.projects[i].flaggedForDeletion = false; 
      }
    }
  }
  public setOffShowFlag(pId: string) : void {
    this.openDesc = false;
    for(let i=0; i < this.projects.length; i++) {
      if(this.projects[i]._id == pId) {
        this.projects[i].flaggedForDesc = false; 
      }
    }
  }



  public formIsValid() : boolean {
    if(!this.formProjects.name || !this.formProjects.description || !this.formProjects.term || !this.formProjects.language 
      || !this.formProjects.concepts || !this.formProjects.tools) {
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

  public onProjectSubmit() : void {
    this.formProjects.userId = this.getUserName();
    
    if(this.formIsValid()) {
      this.projectDataService.addProjects(this.formProjects)
        .then(dBProjects => {          
          let eds = this.projects.slice(0);
          eds.unshift(dBProjects);
          this.projects = eds;
          this.resetAndHideProjectForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.'
    }
  }

  public resetAndHideProjectForm() : void {
    this.formProjects.name = '';
    this.formProjects.description = '';
    this.formProjects.descriptionFull = '';
    this.formProjects.term =  '';
    this.formProjects.language =  '';
    this.formProjects.tools = [];
    this.formProjects.concepts = [];
    this.openForm = false;
    this.errorInForm = '';
    this.formProjects.link = ''; 
    this.formProjects.github = ''; 
  }

  public deleteProjects(pId: string) : void{
    this.projectDataService.deleteProjectsById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readProjects()}});
  }


  ngOnInit() {
    this.readProjects();
  }

}
