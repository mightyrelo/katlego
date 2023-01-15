import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsContentComponent } from './contact-details-content.component';

describe('ContactDetailsContentComponent', () => {
  let component: ContactDetailsContentComponent;
  let fixture: ComponentFixture<ContactDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
