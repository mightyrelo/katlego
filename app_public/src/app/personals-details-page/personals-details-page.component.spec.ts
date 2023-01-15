import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalsDetailsPageComponent } from './personals-details-page.component';

describe('PersonalsDetailsPageComponent', () => {
  let component: PersonalsDetailsPageComponent;
  let fixture: ComponentFixture<PersonalsDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalsDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
