import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { MDataService } from '../m-data.service';
import { M } from '../m';

@Component({
  selector: 'app-m-details-page',
  templateUrl: './m-details-page.component.html',
  styleUrls: ['./m-details-page.component.css']
})
export class MDetailsPageComponent implements OnInit {

  public newM: M;

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
    private mDataService: MDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() : void {
   
   this.route.paramMap
     .pipe(
       switchMap((params: ParamMap) => {
        let id = params.get('mId');
        return this.mDataService.getMById(id);
       })
     )
     .subscribe((newM: M) => {
      this.newM = newM;
      this.pageContent.header.title = newM.a1.toString();
      this.pageContent.sideBar.main = `${newM.a1} is on ppApp because they are serious about putting pap on the table.`
      this.pageContent.sideBar.sub = `This app was made for people like ${newM.a1}`
     });
  }
}
