import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsContentComponent } from './article-details-content.component';

describe('ArticleDetailsContentComponent', () => {
  let component: ArticleDetailsContentComponent;
  let fixture: ComponentFixture<ArticleDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
