import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Seat } from 'src/app/models/seat';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selectseats',
  templateUrl: './selectseats.component.html',
  styleUrls: ['./selectseats.component.css']
})
export class SelectseatsComponent implements OnInit {

  shows = [];
  seats: Array<Array<Seat>>;
  selectedSeats: Array<Seat>;
  selectedShowNumber: number;
  subscriptionArry: Array<Subscription>;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptionArry = [];
    this.shows = this.dataService.getShows();
    
    const subscrption1 = this.dataService.getSelectedSeats().subscribe(selectedSeats => {
      this.selectedSeats = selectedSeats;
    });

    const subscrption2 = this.dataService.getSelectedShowNumber().subscribe(selectedShowNumber => {
      this.selectedShowNumber = selectedShowNumber;
      this.seats = this.dataService.getSeatsByShowNumber(this.selectedShowNumber);
    });

    this.subscriptionArry.push(subscrption1);
    this.subscriptionArry.push(subscrption2);
  }

  showChanged(event) {
    this.dataService.setSelectedShowNumber(event.value + 1);
    this.dataService.setSelectedSeats([]);
  }

  seatSelected(seat, event) {
    if(event.target.checked && (this.selectedSeats.indexOf(seat) == -1)) {
      this.selectedSeats.push(seat);
    }

    if(!event.target.checked) {
      let index = this.selectedSeats.indexOf(seat);
      if(index != -1) {
        this.selectedSeats.splice(index, 1);
      }
    }

    this.dataService.setSelectedSeats(this.selectedSeats);
  }

  getSelectedSeats() {
    let seats = '';
    if (this.selectedSeats.length == 0) {
      seats = '--';
    } else {
      this.selectedSeats.forEach(seat => {
        seats += seat.seatNumber + ' ';
      });
    }
    return seats;
  }

  bookTickets() {
    if(this.selectedSeats.length > 0) {
      this.dataService.bookSeats();
      this.router.navigateByUrl('/success');
    }else {
      alert("Please select seats");
    }
  }

  isSelected(seat: Seat) {
    return this.selectedSeats.includes(seat);
  }

  ngOnDestroy() {
    this.subscriptionArry.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}