import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduListPageComponent } from './edu-list-page.component';

describe('EduListPageComponent', () => {
  let component: EduListPageComponent;
  let fixture: ComponentFixture<EduListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
