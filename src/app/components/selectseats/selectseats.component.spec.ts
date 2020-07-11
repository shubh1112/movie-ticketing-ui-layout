import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectseatsComponent } from './selectseats.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';

describe('SelectseatsComponent', () => {
  let component: SelectseatsComponent;
  let fixture: ComponentFixture<SelectseatsComponent>;
  let dataService: DataService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SelectseatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectseatsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should get data from data service', () => {

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
    ];

    let seats = [
      [
        {
          seatNumber: "A1",
          booked: false,
          seatCost: 320
        },
        {
          seatNumber: "A2",
          booked: false,
          seatCost: 320
        },
        {
          seatNumber: "A3",
          booked: false,
          seatCost: 320
        }
      ],
      [
        {
          seatNumber: "B1",
          booked: false,
          seatCost: 280
        },
        {
          seatNumber: "B2",
          booked: false,
          seatCost: 280
        },
        {
          seatNumber: "B3",
          booked: false,
          seatCost: 280
        }
      ],
      [
        {
          seatNumber: "C1",
          booked: false,
          seatCost: 240
        },
        {
          seatNumber: "C2",
          booked: false,
          seatCost: 240
        },
        {
          seatNumber: "C3",
          booked: false,
          seatCost: 240
        }
      ]
    ]

    spyOn(dataService, "getSelectedSeats").and.callFake(() => {
      return new BehaviorSubject(selectedSeats);
    });

    spyOn(dataService, "getSelectedShowNumber").and.callFake(() => {
      return new BehaviorSubject(1);
    });

    spyOn(dataService, "getSeatsByShowNumber").and.callFake(() => {
      return seats;
    });

    component.ngOnInit();

    expect(component.shows).toContain("Show 1");
    expect(component.shows).toContain("Show 2");
    expect(component.shows).toContain("Show 3");
    expect(component.selectedSeats).toBe(selectedSeats);
    expect(component.selectedShowNumber).toBe(1);
    expect(component.seats).toBe(seats);
    expect(component.subscriptionArry.length).toBe(2);
  });

  it('seatSelected should add or remove seat from selectedSeats array', () => {
    let seat = {
      seatNumber: "A1",
      booked: false,
      seatCost: 320
    }

    component.seatSelected(seat, {target: { checked: true }});

    expect(component.selectedSeats).toContain(seat);

    component.seatSelected(seat, {target: { checked: false }});

    expect(component.selectedSeats).not.toContain(seat);
  });

  it('should return string value of all selected seats', () => {
    let seat = {
      seatNumber: "A1",
      booked: false,
      seatCost: 320
    }

    component.seatSelected(seat, {target: { checked: true }});

    let seatString = component.getSelectedSeats();
    expect(seatString).toContain("A1");
  });

  it('should ccheck if seat is selected', () => {
    let seat = {
      seatNumber: "A1",
      booked: false,
      seatCost: 320
    }

    expect(component.isSelected(seat)).toBeFalse();
    component.seatSelected(seat, {target: { checked: true }});
    expect(component.isSelected(seat)).toBeTrue();
  });
});
