import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsuccessComponent } from './bookingsuccess.component';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookingsuccessComponent', () => {
  let component: BookingsuccessComponent;
  let fixture: ComponentFixture<BookingsuccessComponent>;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BookingsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsuccessComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should fetch booked seats and calculate costs and taxes', () => {

    let selectedSeats = [
      {
        seatNumber: "A1",
        booked: false,
        seatCost: 320
      },
      {
        seatNumber: "B1",
        booked: false,
        seatCost: 280
      },
      {
        seatNumber: "C1",
        booked: false,
        seatCost: 240
      }
    ]

    spyOn(dataService, "getSelectedSeats").and.callFake(() => {
      return new BehaviorSubject(selectedSeats);
    });

    spyOn(dataService, "getSelectedShowNumber").and.callFake(() => {
      return new BehaviorSubject(1);
    });

    component.ngOnInit();

    expect(component.bookingCost).toBe(840);
    expect(component.serviceTax).toBeCloseTo(117.6);
    expect(component.swachhBharatCess).toBeCloseTo(4.2);
    expect(component.krishiKalyanCess).toBeCloseTo(4.2);
    expect(component.total).toBeCloseTo(966);

    expect(component.showName).toBe("Show 1");
    expect(component.subscriptionArry.length).toBe(2);
  });
});
