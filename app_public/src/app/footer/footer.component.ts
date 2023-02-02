import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { ContactDataService } from '../contact-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public contacts: Contact[];

  constructor(
    private contactDataService: ContactDataService
  ) { }

  public readContacts(): void {
    
    this.contactDataService.readContacts()
      .then((response) => {this.contacts = response.reverse();});
  }

  ngOnInit() :void {
    this.readContacts();
  }

}
