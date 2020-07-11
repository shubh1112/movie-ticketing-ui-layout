import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  totalRevenue = 0;
  totalServiceTax = 0;
  totalSwachhBharatCess = 0;
  totalKrishiKalyanCess = 0;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.totalRevenue = this.dataService.getTotalRevenue();
    this.totalServiceTax = this.dataService.getTotalServiceTax();
    this.totalSwachhBharatCess = this.dataService.getTotalSwachhaBharatCess();
    this.totalKrishiKalyanCess = this.dataService.getTotalKrishiKalyanCess();
    this.dataService.setSelectedSeats([]);
    this.dataService.setSelectedShowNumber(1);
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
