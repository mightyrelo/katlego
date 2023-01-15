import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPageComponent } from './m-page.component';

describe('MPageComponent', () => {
  let component: MPageComponent;
  let fixture: ComponentFixture<MPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
