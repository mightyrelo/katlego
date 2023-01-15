import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { M } from '../m';
import {SM} from '../sm';
import { SmDataService } from '../sm-data.service';
import { AuthenticationService } from '../authentication.service';
import { MDataService } from '../m-data.service';

@Component({
  selector: 'app-m-details-content',
  templateUrl: './m-details-content.component.html',
  styleUrls: ['./m-details-content.component.css']
})
export class MDetailsContentComponent implements OnInit {

  @Input() dbM: M;

  public formSM : SM = {
    _id: '',
    b1: '',
    b2: null,
    user: '',
    flaggedForDelete: false
  };

  private ms: M[];

  private m: M;

  public formError = '';
  public displayForm : boolean = false;

  constructor(

    private smDataService : SmDataService,
    private route : ActivatedRoute,
    private authService: AuthenticationService,
    private mDataService: MDataService,
    private router: Router
  ) { }

  private smFormIsValid() : boolean {
    if(!this.formSM.b1 || !this.formSM.b2) {
      return false;
    } else {
      return true;
    }
  }

  public resetAndHideSMForm() : void {
    this.displayForm = false;
    this.formSM.b1 = '';
    this.formSM.b2 = null;
    this.formSM.user = null;
    this.formError = '';
  }

  public onSMSubmit() : void {
    this.formSM.user = this.getUserName();
    if(this.smFormIsValid()) {
      this.smDataService.postSM(this.dbM._id.toString(), this.formSM)
        .then((sm: SM) => {
          console.log('sm saved', sm);  
          //save sm on m
          let sms = this.dbM.sms.slice(0);
          sms.unshift(sm);
          this.dbM.sms = sms; 
          this.resetAndHideSMForm();
        });
    } else {
      this.formError = 'all fields required, leka gape';
    }
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName() : string { 
      const {name} =  this.authService.getCurrentUser();
      return name ? name : 'guest';
    
  }

  private getMs(): void {
    this.mDataService.getMs()
      .then(response => this.ms = response.reverse());
  }

  public flagged(mId: string, smId: string) : void {
  
    for(let i = 0; i < this.ms.length; i++) {
      if(this.ms[i]._id === mId) {
        for(let j = 0; j < this.ms[i].sms.length; j++){
          if(this.ms[i].sms[j]._id === smId) {
            this.ms[i].sms[j].flaggedForDelete = true;
          }
        }
      }
    }
  }
  
  public isFlagged(mId: string, smId: string) : boolean {
  
    for(let i = 0; i < this.ms.length; i++) {
      if(this.ms[i]._id === mId) {
        for(let j = 0; j < this.ms[i].sms.length; j++){
          if(this.ms[i].sms[j]._id === smId) {
            if(this.ms[i].sms[j].flaggedForDelete) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }

  public setFlagOff(mId: string, smId: string) : void {
    for(let i = 0; i < this.ms.length; i++) {
      if(this.ms[i]._id === mId) {
        for(let j = 0; j < this.ms[i].sms.length; j++){
          if(this.ms[i].sms[j]._id === smId) {
            this.ms[i].sms[j].flaggedForDelete = false;
          }
        }
      }
    }
  }

  public getM(mId: string) : void {
    console.log('getting...');
    this.mDataService.getMById(mId)
      .then(response => this.m = response);

  }


  public deleteSM(mId: string, smId: string) : void {
    console.log('deleting..,,');
    for(let i = 0; i < this.ms.length; i++) {
      if(this.ms[i]._id === mId) {
        for(let j = 0; j < this.ms[i].sms.length; j++){
          if(this.ms[i].sms[j]._id === smId) {
            this.smDataService.deleteSMByIds(mId, smId)
             .then(resp => {
              if(!resp){
                console.log('deleted');
                let sms = this.dbM.sms.slice(0);
                this.dbM.sms = sms;       
              }});
          }
        }
      }
    }
  }

  ngOnInit() {
    this.getMs();
   /* this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
       let mId = params.get('mId');
       let smId = params.get('smId');
       let del = false;
       if(mId && smId) {
        del = true;
        return 'hello';
       }
      })
    )
    .subscribe((none: any) => {
        console.log('deleted');
    });
   
  }*/
  }
}
