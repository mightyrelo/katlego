import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';



import { Personals } from '../personals';
import { PersonalsDataService } from '../personals-data.service';

@Component({
  selector: 'app-personals-details-page',
  templateUrl: './personals-details-page.component.html',
  styleUrls: ['./personals-details-page.component.css']
})
export class PersonalsDetailsPageComponent implements OnInit {

  public dbPers: Personals

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sideBar: {
      main: '',
      sub: ''
    }
  };

  constructor(
    private persDataService: PersonalsDataService,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit() : void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('personalsId');
          return this.persDataService.getPersonalsById(id);
        })
      )
      .subscribe((newPers: Personals) => {
        this.dbPers = newPers;
        this.pageContent.header.title = newPers.name;
        this.pageContent.sideBar.main = `${newPers.name} was born and raised in Soweto, Johannesburg and is currently a resident of Zuurbekom in Westonaria.`;
        this.pageContent.sideBar.sub = `He began primary school education in 1996 and completed his high school at John Orr Technical High in 2006. After working as a service technician for an insurance company, ${newPers.name} he completed his bachelor's in 2021. He currently works as a software engineer and holds an executive position in an engineering services company.`;
      })
  }
}
