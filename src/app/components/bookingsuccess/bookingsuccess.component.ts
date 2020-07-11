import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Seat } from 'src/app/models/seat';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookingsuccess',
  templateUrl: './bookingsuccess.component.html',
  styleUrls: ['./bookingsuccess.component.css']
})
export class BookingsuccessComponent implements OnInit {

  showName: string
  bookingCost = 0;
  serviceTax = 0;
  swachhBharatCess = 0;
  krishiKalyanCess = 0;
  total = 0;
  subscriptionArry: Array<Subscription>;

  constructor(
    private dataService: DataService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.subscriptionArry = [];
    const subscrption1 = this.dataService.getSelectedSeats().subscribe(selectedSeats => {
      selectedSeats.forEach((seat: Seat) => {
        this.bookingCost += seat.seatCost;
      });
      this.serviceTax = this.bookingCost * (14/100);
      this.swachhBharatCess = this.bookingCost * (0.5/100);
      this.krishiKalyanCess = this.bookingCost * (0.5/100);
      this.total = this.bookingCost + this.serviceTax + this.swachhBharatCess + this.krishiKalyanCess;

      this.dataService.addRevenue(this.bookingCost);
      this.dataService.addServiceTax(this.serviceTax);
      this.dataService.addSwachhaBharatCess(this.swachhBharatCess);
      this.dataService.addKrishiKalyanCess(this.krishiKalyanCess);
    });

    const subscrption2 = this.dataService.getSelectedShowNumber().subscribe(showNumber => {
      this.showName = this.dataService.getShows()[showNumber-1];
    });

    this.subscriptionArry.push(subscrption1);
    this.subscriptionArry.push(subscrption2);
  }

  back() {
    this.router.navigateByUrl('/');
  }

  next() {
    this.router.navigateByUrl('/revenue');
  }

  ngOnDestroy() {
    this.subscriptionArry.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
