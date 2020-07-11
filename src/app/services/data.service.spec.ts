import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all the shows', () => {
    let shows = service.getShows();

    expect(shows).toContain("Show 1");
    expect(shows).toContain("Show 2");
    expect(shows).toContain("Show 3");
  });

  it('should return seats by show number', () => {
    let expectedOutput = [
      [
        {
          "seatNumber": "A1",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A2",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A3",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A4",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A5",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A6",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A7",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A8",
          "booked": false,
          "seatCost": 320
        },
        {
          "seatNumber": "A9",
          "booked": false,
          "seatCost": 320
        }
      ],
      [
        {
          "seatNumber": "B1",
          "booked": false,
          "seatCost": 280
        },
        {
          "seatNumber": "B2",
          "booked": false,
          "seatCost": 280
        },
        {
          "seatNumber": "B3",
          "booked": false,
          "seatCost": 280
        },
        {
          "seatNumber": "B4",
          "booked": false,
          "seatCost": 280
        },
        {
          "seatNumber": "B5",
          "booked": false,
          "seatCost": 280
        },
        {
          "seatNumber": "B6",
          "booked": false,
          "seatCost": 280
        },
        null,
        null,
        null
      ],
      [
        null,
        {
          "seatNumber": "C2",
          "booked": false,
          "seatCost": 240
        },
        {
          "seatNumber": "C3",
          "booked": false,
          "seatCost": 240
        },
        {
          "seatNumber": "C4",
          "booked": false,
          "seatCost": 240
        },
        {
          "seatNumber": "C5",
          "booked": false,
          "seatCost": 240
        },
        {
          "seatNumber": "C6",
          "booked": false,
          "seatCost": 240
        },
        {
          "seatNumber": "C7",
          "booked": false,
          "seatCost": 240
        },
        null,
        null
      ]
    ];

    let seats = service.getSeatsByShowNumber(1);

    expect(seats).toEqual(expectedOutput);
  });

  it('should return selected seats', () => {
    let seat = {
      seatNumber: "A1",
      booked: false,
      seatCost: 320
    };

    service.setSelectedSeats([seat]);

    let selectedSeats;
    service.getSelectedSeats().subscribe(seats => {
      selectedSeats = seats;
    });

    expect(selectedSeats).toContain(seat);
  });

  it('should return selected show number', () => {
    let selectedShow;
    service.getSelectedShowNumber().subscribe(showNum => {
      selectedShow = showNum;
    });

    expect(selectedShow).toBe(1);
  });

  it('should set selected show number', () => {
    service.setSelectedShowNumber(2);

    expect(service.selectedShowNumber.getValue()).toBe(2);
  });

  it('should return total revenue', () => {
    service.addRevenue(100);
    expect(service.getTotalRevenue()).toBe(100);
  });

  it('should return total service tax', () => {
    service.addServiceTax(100);
    expect(service.getTotalServiceTax()).toBe(100);
  });

  it('should return total swachh bharat cess', () => {
    service.addSwachhaBharatCess(100);
    expect(service.getTotalSwachhaBharatCess()).toBe(100);
  });

  it('should return total krishi kalyan cess', () => {
    service.addKrishiKalyanCess(100);
    expect(service.getTotalKrishiKalyanCess()).toBe(100);
  });
});
