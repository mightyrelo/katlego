import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListContentComponent } from './contact-list-content.component';

describe('ContactListContentComponent', () => {
  let component: ContactListContentComponent;
  let fixture: ComponentFixture<ContactListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
