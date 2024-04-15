import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfobarComponent } from './components/infobar/infobar.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { DetailComponent } from './components/detail/detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './components/listing/listing.component';
import { IlanComponent } from './components/ilan/ilan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    InfobarComponent,
    SummaryPipe,
    DetailComponent,
    ListingComponent,
    IlanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
