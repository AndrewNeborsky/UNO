import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterComponent } from './creater.component';

describe('CreaterComponent', () => {
  let component: CreaterComponent;
  let fixture: ComponentFixture<CreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
