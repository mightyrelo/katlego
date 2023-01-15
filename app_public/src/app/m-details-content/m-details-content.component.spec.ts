import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDetailsContentComponent } from './m-details-content.component';

describe('MDetailsContentComponent', () => {
  let component: MDetailsContentComponent;
  let fixture: ComponentFixture<MDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
