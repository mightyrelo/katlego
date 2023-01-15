import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDetailsPageComponent } from './m-details-page.component';

describe('MDetailsPageComponent', () => {
  let component: MDetailsPageComponent;
  let fixture: ComponentFixture<MDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
