import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalsPageComponent } from './personals-page.component';

describe('PersonalsPageComponent', () => {
  let component: PersonalsPageComponent;
  let fixture: ComponentFixture<PersonalsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
