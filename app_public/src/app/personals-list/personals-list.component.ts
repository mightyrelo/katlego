import { Component, OnInit } from '@angular/core';

import { PersonalsDataService } from '../personals-data.service';
import { AuthenticationService } from '../authentication.service';
import { Personals } from '../personals';

@Component({
  selector: 'app-personals-list',
  templateUrl: './personals-list.component.html',
  styleUrls: ['./personals-list.component.css']
})
export class PersonalsListComponent implements OnInit {

  public personals: Personals[];

  public formPersonals = {
    _id: '',
    name: '',
    gender: '',
    idNo: null,
    race: '',
    languages: [],
    passions: [],
    maritalStatus: '',
    userId: '',
    nationality: '',
    flaggedForDeletion: false,
    passport: '',
    license: '', 
  };

  public openForm : boolean = false;

  public errorInForm : string = '';

  constructor(
    private persDataService : PersonalsDataService,
    private authService : AuthenticationService 
  ) { }

  //create wrappers
  public readPersonals(): void {
    
    this.persDataService.readPersonals()
      .then((response) => {this.personals = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(pId: string) : void {
    for(let i=0; i < this.personals.length; i++) {
      if(this.personals[i]._id == pId) {
        console.log(pId, ' flagged');
        this.personals[i].flaggedForDeletion = true;
      } 
    }
  }

  public isFlagged(pId: string) : boolean {
    for(let i=0; i < this.personals.length; i++) {
      if(this.personals[i]._id == pId) {
        if(this.personals[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.personals.length; i++) {
      if(this.personals[i]._id == pId) {
        this.personals[i].flaggedForDeletion = false; 
      }
    }
  }

  public formIsValid() : boolean {
    if(!this.formPersonals.name || !this.formPersonals.gender || !this.formPersonals.idNo || !this.formPersonals.race || !this.formPersonals.languages || 
      !this.formPersonals.passions || !this.formPersonals.maritalStatus || !this.formPersonals.nationality) {
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

  public onPersonalsSubmit() : void {
    this.formPersonals.userId = this.getUserName();
    
    if(this.formIsValid()) {
      this.persDataService.addPersonals(this.formPersonals)
        .then(dBPers => {          
          let pers = this.personals.slice(0);
          pers.unshift(dBPers);
          this.personals = pers;
          this.resetAndHidePersonalForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.'
    }
  }

  public resetAndHidePersonalForm() : void {
    this.formPersonals.name = '';
    this.formPersonals.gender = '';
    this.formPersonals.idNo =  null;
    this.formPersonals.race =  '';
    this.formPersonals.languages = [];
    this.formPersonals.passions =  [];
    this.formPersonals.maritalStatus =  '';
    this.formPersonals.nationality =  '';
    this.formPersonals.license =  '';
    this.formPersonals.passport =  '';
    this.openForm = false;
    this.errorInForm = ''; 
  }

  public deletePersonals(pId: string) : void{
    this.persDataService.deletePesonalsById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readPersonals()}});
  }

  ngOnInit() {
    this.readPersonals();
  }

}
