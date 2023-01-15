import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduListContentComponent } from './edu-list-content.component';

describe('EduListContentComponent', () => {
  let component: EduListContentComponent;
  let fixture: ComponentFixture<EduListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
