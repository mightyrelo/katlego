import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduDetailsContentComponent } from './edu-details-content.component';

describe('EduDetailsContentComponent', () => {
  let component: EduDetailsContentComponent;
  let fixture: ComponentFixture<EduDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
