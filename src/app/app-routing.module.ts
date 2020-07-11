import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectseatsComponent } from './components/selectseats/selectseats.component';
import { BookingsuccessComponent } from './components/bookingsuccess/bookingsuccess.component';
import { RevenueComponent } from './components/revenue/revenue.component';


const routes: Routes = [
  {
    path: '',
    component: SelectseatsComponent,
  },
  {
    path: 'success',
    component: BookingsuccessComponent
  },
  {
    path: 'revenue',
    component: RevenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
