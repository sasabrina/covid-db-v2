import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectedChartComponent } from './infected-chart.component';

describe('InfectedChartComponent', () => {
  let component: InfectedChartComponent;
  let fixture: ComponentFixture<InfectedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
