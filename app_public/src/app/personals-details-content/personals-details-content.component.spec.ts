import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalsDetailsContentComponent } from './personals-details-content.component';

describe('PersonalsDetailsContentComponent', () => {
  let component: PersonalsDetailsContentComponent;
  let fixture: ComponentFixture<PersonalsDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalsDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalsDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
