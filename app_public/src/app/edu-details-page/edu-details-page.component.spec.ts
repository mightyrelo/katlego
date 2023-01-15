import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduDetailsPageComponent } from './edu-details-page.component';

describe('EduDetailsPageComponent', () => {
  let component: EduDetailsPageComponent;
  let fixture: ComponentFixture<EduDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
