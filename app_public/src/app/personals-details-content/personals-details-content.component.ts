import { Component, OnInit, Input } from '@angular/core';

import { Personals } from '../personals';
import { AuthenticationService } from '../authentication.service';
import { PersonalsDataService } from '../personals-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personals-details-content',
  templateUrl: './personals-details-content.component.html',
  styleUrls: ['./personals-details-content.component.css']
})
export class PersonalsDetailsContentComponent implements OnInit {

  @Input() dbPers : Personals

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

  public pageContent = {
    header: {
      title: '',
      strapline: 'Details of a specific personals',
    },
    sideBar: {
      main: 'personal details',
      sub: 'details for a specific person'
    }
  };

  constructor(
    private authService: AuthenticationService,
    private persDataService: PersonalsDataService,
    private router: Router
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  private getUserName() : string {
    const {name} = this.authService.getCurrentUser();
    return name ? name : 'Guest'
  }

  public onPersonalsSubmit(pId: string) : void {
    this.formPersonals.userId = this.getUserName();
    this.persDataService.editPersonals(pId, this.formPersonals)
      .then(dbPers => {
        console.log(dbPers);
        this.resetAndHidePersonalForm(); 
        this.dbPers = dbPers;
      });
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
    this.openForm = false;
    this.errorInForm = ''; 
  }



  ngOnInit() {
  }

}
