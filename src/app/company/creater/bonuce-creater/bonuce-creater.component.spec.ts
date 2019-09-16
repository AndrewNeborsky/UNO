import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonuceComponent } from './bonuce-creater.component';

describe('BonuceComponent', () => {
  let component: BonuceComponent;
  let fixture: ComponentFixture<BonuceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonuceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonuceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
