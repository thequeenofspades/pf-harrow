import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarrowReadingComponent } from './harrow-reading.component';

describe('HarrowReadingComponent', () => {
  let component: HarrowReadingComponent;
  let fixture: ComponentFixture<HarrowReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarrowReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarrowReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
