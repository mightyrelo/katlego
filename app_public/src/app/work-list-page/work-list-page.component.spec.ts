import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListPageComponent } from './work-list-page.component';

describe('WorkListPageComponent', () => {
  let component: WorkListPageComponent;
  let fixture: ComponentFixture<WorkListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
