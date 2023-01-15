import { Component, OnInit } from '@angular/core';


import { Contact } from '../contact';
import { ContactDataService } from '../contact-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-contact-list-content',
  templateUrl: './contact-list-content.component.html',
  styleUrls: ['./contact-list-content.component.css']
})
export class ContactListContentComponent implements OnInit {

  public contacts: Contact[];

  public formContacts = {
    _id: '',
    address: '',
    facebook: '',
    instagram: '',
    emails: [],
    cellphones: [],
    twitter: '',
    userId: '',
    flaggedForDeletion: false 
  };

  public openForm : boolean = false;

  public errorInForm : string = '';


  constructor(
    private contactDataService: ContactDataService,
    private authService: AuthenticationService
  ) { }

  //create wrappers
  public readContacts(): void {
    
    this.contactDataService.readContacts()
      .then((response) => {this.contacts = response.reverse();});
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public setFlag(pId: string) : void {
    for(let i=0; i < this.contacts.length; i++) {
      if(this.contacts[i]._id == pId) {
        console.log(pId, ' flagged');
        this.contacts[i].flaggedForDeletion = true;
      } 
    }
  }

  public isFlagged(pId: string) : boolean {
    for(let i=0; i < this.contacts.length; i++) {
      if(this.contacts[i]._id == pId) {
        if(this.contacts[i].flaggedForDeletion) {
          return true;
        }
      }
    }
    return false;
  }

  public setOffFlag(pId: string) : void {
    for(let i=0; i < this.contacts.length; i++) {
      if(this.contacts[i]._id == pId) {
        this.contacts[i].flaggedForDeletion = false; 
      }
    }
  }

  public formIsValid() : boolean {
    if(!this.formContacts.address || !this.formContacts.facebook || !this.formContacts.instagram || !this.formContacts.twitter 
      || !this.formContacts.cellphones || !this.formContacts.emails) {
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

  public onContactSubmit() : void {
    this.formContacts.userId = this.getUserName();
    
    if(this.formIsValid()) {
      this.contactDataService.addContacts(this.formContacts)
        .then(dBContacts => {          
          let eds = this.contacts.slice(0);
          eds.unshift(dBContacts);
          this.contacts = eds;
          this.resetAndHideContactForm();
        })
    } else {
      this.errorInForm = 'all fields required, leka gape.'
    }
  }

  public resetAndHideContactForm() : void {
    this.formContacts.address = '';
    this.formContacts.facebook = '';
    this.formContacts.instagram =  '';
    this.formContacts.twitter =  '';
    this.formContacts.emails = [];
    this.formContacts.cellphones = [];
    this.openForm = false;
    this.errorInForm = ''; 
  }

  public deleteContacts(pId: string) : void{
    this.contactDataService.deleteContactsById(pId)
    .then(resp => {if(!resp){console.log('deleted');this.readContacts()}});
  }


  ngOnInit() {
    this.readContacts();
  }

}
