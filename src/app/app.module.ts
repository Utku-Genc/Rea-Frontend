import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfobarComponent } from './components/infobar/infobar.component';
import { DetailComponent } from './components/detail/detail.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { HouseListingComponent } from './components/house-listing/house-listing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SummaryPipe } from './pipes/summary.pipe';
import { PriceFormatPipe } from './pipes/price-format.pipe';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingAddComponent } from './components/listing-add/listing-add.component';
import { LandListingComponent } from './components/land-listing/land-listing.component';

import{ToastrModule} from "ngx-toastr";
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListingEditingComponent } from './components/listing-editing/listing-editing.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserManagementComponent } from './components/user-management/user-management.component'



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    InfobarComponent,
    SummaryPipe,
    DetailComponent,
    IlanComponent,
    HouseListingComponent,
    PriceFormatPipe,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListingAddComponent,
    LandListingComponent,
    ListingEditingComponent,
    AdminDashboardComponent,
    UnauthorizedComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
      timeOut:5000
    }),
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
