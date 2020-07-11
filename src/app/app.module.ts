import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectseatsComponent } from './components/selectseats/selectseats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import { BookingsuccessComponent } from './components/bookingsuccess/bookingsuccess.component';
import { RevenueComponent } from './components/revenue/revenue.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectseatsComponent,
    BookingsuccessComponent,
    RevenueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
