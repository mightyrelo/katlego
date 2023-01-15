import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDetailsContentComponent } from './work-details-content.component';

describe('WorkDetailsContentComponent', () => {
  let component: WorkDetailsContentComponent;
  let fixture: ComponentFixture<WorkDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
