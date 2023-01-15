import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListContentComponent } from './work-list-content.component';

describe('WorkListContentComponent', () => {
  let component: WorkListContentComponent;
  let fixture: ComponentFixture<WorkListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
