import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCreaterComponent } from './news-creater.component';

describe('NewsCreaterComponent', () => {
  let component: NewsCreaterComponent;
  let fixture: ComponentFixture<NewsCreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
