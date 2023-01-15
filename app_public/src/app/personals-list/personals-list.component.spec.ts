import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalsListComponent } from './personals-list.component';

describe('PersonalsListComponent', () => {
  let component: PersonalsListComponent;
  let fixture: ComponentFixture<PersonalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
