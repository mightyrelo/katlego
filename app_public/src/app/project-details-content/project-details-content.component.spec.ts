import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsContentComponent } from './project-details-content.component';

describe('ProjectDetailsContentComponent', () => {
  let component: ProjectDetailsContentComponent;
  let fixture: ComponentFixture<ProjectDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
