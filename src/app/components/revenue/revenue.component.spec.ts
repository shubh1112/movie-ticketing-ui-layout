import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueComponent } from './revenue.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from 'src/app/services/data.service';

describe('RevenueComponent', () => {
  let component: RevenueComponent;
  let fixture: ComponentFixture<RevenueComponent>;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should get all the values from data service', () => {

    spyOn(dataService, "getTotalRevenue").and.callFake(() => {
      return 800;
    });

    spyOn(dataService, "getTotalServiceTax").and.callFake(() => {
      return 233;
    });

    spyOn(dataService, "getTotalSwachhaBharatCess").and.callFake(() => {
      return 100;
    });

    spyOn(dataService, "getTotalKrishiKalyanCess").and.callFake(() => {
      return 100;
    });

    component.ngOnInit();

    expect(component.totalRevenue).toBe(800);
    expect(component.totalServiceTax).toBe(233);
    expect(component.totalSwachhBharatCess).toBe(100);
    expect(component.totalKrishiKalyanCess).toBe(100);
  });
});
