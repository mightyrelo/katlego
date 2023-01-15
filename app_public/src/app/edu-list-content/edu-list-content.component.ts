import { Component, OnInit } from '@angular/core';

import { EduDataService } from '../edu-data.service';
import { AuthenticationService } from '../authentication.service';
import { Education } from '../education';

@Component({
  selector: 'app-edu-list-content',
  templateUrl: './edu-list-content.component.html',
  styleUrls: ['./edu-list-content.component.css']
})
export class EduListContentComponent implements OnInit {

  public educations: Education[];

  public formEdus = {
    _id: '',
    institution: '',
    qualification: '',
    startDate: '',
    endDate: '',
    interests: [],
    userId: '',
    flaggedForDeletion: false 
  };

  public openForm : boolean = false;

  public errorInForm : string = '';


  constructor(
    private eduDataService: EduDataService,
    private authService: AuthenticationService
  ) { }

  //create wrappers
  public readEdus(): void {
    
    this.eduDataService.readEdus()
      .then((response) => {this.educations = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(pId: string) : void {
    for(let i=0; i < this.educations.length; i++) {
      if(this.educations[i]._id == pId) {
        console.log(pId, ' flagged');
        this.educations[i].flaggedForDeletion = true;
      } 
    }
  }

  public isFlagged(pId: string) : boolean {
    for(let i=0; i < this.educations.length; i++) {
      if(this.educations[i]._id == pId) {
        if(this.educations[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.educations.length; i++) {
      if(this.educations[i]._id == pId) {
        this.educations[i].flaggedForDeletion = false; 
      }
    }
  }

  public formIsValid() : boolean {
    if(!this.formEdus.institution || !this.formEdus.qualification || !this.formEdus.startDate || !this.formEdus.endDate || !this.formEdus.interests) {
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

  public onEducationSubmit() : void {
    this.formEdus.userId = this.getUserName();
    
    if(this.formIsValid()) {
      this.eduDataService.addEdus(this.formEdus)
        .then(dBEdus => {          
          let eds = this.educations.slice(0);
          eds.unshift(dBEdus);
          this.educations = eds;
          this.resetAndHideEducationForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.'
    }
  }

  public resetAndHideEducationForm() : void {
    this.formEdus.institution = '';
    this.formEdus.qualification = '';
    this.formEdus.startDate =  '';
    this.formEdus.endDate =  '';
    this.formEdus.interests = [];
    this.openForm = false;
    this.errorInForm = ''; 
  }

  public deletePersonals(pId: string) : void{
    this.eduDataService.deleteEdusById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readEdus()}});
  }


  ngOnInit() {
    this.readEdus();
  }

}
