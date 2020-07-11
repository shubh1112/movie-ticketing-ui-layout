import { Injectable } from '@angular/core';
import * as data from '../../data/data.json'
import { Seat } from '../models/seat';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  shows = ["Show 1", "Show 2", "Show 3"];
  seats = (data as any).default;
  selectedSeats = new BehaviorSubject([]);
  selectedShowNumber = new BehaviorSubject(1);
  private totalRevenue = 0;
  private totalServiceTax = 0;
  private totalSwachhaBharatCess = 0;
  private totalKrishKalyanCess = 0;

  constructor() { }

  getShows() {
    return this.shows;
  }

  getSeatsByShowNumber(showNumber: number) {
    return this.seats[showNumber];
  }

  getSelectedSeats() {
    return this.selectedSeats;
  }

  getSelectedShowNumber() {
    return this.selectedShowNumber;
  }

  setSelectedShowNumber(selectedShow: number) {
    this.selectedShowNumber.next(selectedShow);
  }

  setSelectedSeats(selectedSeats: Array<Seat>) {
    this.selectedSeats.next(selectedSeats);
  }

  bookSeats() {
    this.selectedSeats.getValue().forEach((seat:Seat) => {
      let row = []
      if(seat.seatNumber.includes('A')) {
        row = this.seats[this.selectedShowNumber.getValue()][0];
        let index = row.indexOf(seat);
        this.seats[this.selectedShowNumber.getValue()][0][index].booked = true;
      }
      if(seat.seatNumber.includes('B')) {
        row = this.seats[this.selectedShowNumber.getValue()][1];
        let index = row.indexOf(seat);
        this.seats[this.selectedShowNumber.getValue()][1][index].booked = true;
      }
      if(seat.seatNumber.includes('C')) {
        row = this.seats[this.selectedShowNumber.getValue()][2];
        let index = row.indexOf(seat);
        this.seats[this.selectedShowNumber.getValue()][2][index].booked = true;
      }
    });
  }

  getTotalRevenue(){
    return this.totalRevenue;
  }

  addRevenue(amount: number) {
    this.totalRevenue += amount;
  }

  getTotalSwachhaBharatCess(){
    return this.totalSwachhaBharatCess;
  }

  addSwachhaBharatCess(amount: number) {
    this.totalSwachhaBharatCess += amount;
  }

  getTotalKrishiKalyanCess(){
    return this.totalKrishKalyanCess;
  }

  addKrishiKalyanCess(amount: number) {
    this.totalKrishKalyanCess += amount;
  }

  getTotalServiceTax(){
    return this.totalServiceTax;
  }

  addServiceTax(amount: number) {
    this.totalServiceTax += amount;
  }
}
