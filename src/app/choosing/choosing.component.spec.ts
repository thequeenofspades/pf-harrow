import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingComponent } from './choosing.component';

describe('ChoosingComponent', () => {
  let component: ChoosingComponent;
  let fixture: ComponentFixture<ChoosingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
