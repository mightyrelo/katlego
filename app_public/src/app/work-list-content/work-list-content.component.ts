import { Component, OnInit } from '@angular/core';

import { Work } from '../work';
import { WorkDataService } from '../work-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-work-list-content',
  templateUrl: './work-list-content.component.html',
  styleUrls: ['./work-list-content.component.css']
})
export class WorkListContentComponent implements OnInit {

  public works: Work[];

  public formWorks = {
    _id: '',
    company: '',
    industry: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: [],
    userId: '',
    contactPerson: '',
    flaggedForDeletion: false 
  };

  public openForm : boolean = false;

  public errorInForm : string = '';


  constructor(
    private workDataService: WorkDataService,
    private authService: AuthenticationService
  ) { }

  //create wrappers
  public readWorks(): void {
    
    this.workDataService.readWorks()
      .then((response) => {this.works = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(pId: string) : void {
    for(let i=0; i < this.works.length; i++) {
      if(this.works[i]._id == pId) {
        console.log(pId, ' flagged');
        this.works[i].flaggedForDeletion = true;
      } 
    }
  }

  public isFlagged(pId: string) : boolean {
    for(let i=0; i < this.works.length; i++) {
      if(this.works[i]._id == pId) {
        if(this.works[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.works.length; i++) {
      if(this.works[i]._id == pId) {
        this.works[i].flaggedForDeletion = false; 
      }
    }
  }

  public formIsValid() : boolean {
    if(!this.formWorks.company || !this.formWorks.industry || !this.formWorks.startDate || !this.formWorks.endDate 
      || !this.formWorks.contactPerson || !this.formWorks.responsibilities || !this.formWorks.position) {
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

  public onWorkSubmit() : void {
    this.formWorks.userId = this.getUserName();
    
    if(this.formIsValid()) {
      this.workDataService.addWorks(this.formWorks)
        .then(dBWorks => {          
          let eds = this.works.slice(0);
          eds.unshift(dBWorks);
          this.works = eds;
          this.resetAndHideWorkForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.'
    }
  }

  public resetAndHideWorkForm() : void {
    this.formWorks.company = '';
    this.formWorks.industry = '';
    this.formWorks.startDate =  '';
    this.formWorks.endDate =  '';
    this.formWorks.responsibilities = [];
    this.formWorks.contactPerson = '';
    this.formWorks.position = '';
    this.openForm = false;
    this.errorInForm = ''; 
  }

  public deleteWorks(pId: string) : void{
    this.workDataService.deleteWorksById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readWorks()}});
  }


  ngOnInit() {
    this.readWorks();
  }

}
