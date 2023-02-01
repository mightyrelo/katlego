import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListContentComponent } from './article-list-content.component';

describe('ArticleListContentComponent', () => {
  let component: ArticleListContentComponent;
  let fixture: ComponentFixture<ArticleListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
