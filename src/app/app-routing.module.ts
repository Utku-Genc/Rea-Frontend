import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailComponent } from './components/detail/detail.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { HouseListingComponent } from './components/house-listing/house-listing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './guards/login.guard';

import { ListingAddComponent } from './components/listing-add/listing-add.component';
import { LandListingComponent } from './components/land-listing/land-listing.component';
import { ListingEditingComponent } from './components/listing-editing/listing-editing.component';
import { ListingOwnerGuard } from './guards/listing-owner.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserManagementComponent } from './components/user-management/user-management.component';



const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },

  { path: ':listingName/detail/:id', component: DetailComponent },

  { path: 'listing', component: IlanComponent },
  { path: 'listing', redirectTo: '/listing/page/1', pathMatch: 'full' },
  { path: 'listing/page/:pageId', component: IlanComponent },
  { path: 'listing/searchText/:searchText/page/:pageId', component: IlanComponent },

  { path: 'houselisting/page/:pageId', component: HouseListingComponent},
  { path: 'houselisting', redirectTo: '/houselisting/page/1', pathMatch: 'full' },

  { path: 'landlisting/page/:pageId', component: LandListingComponent},
  { path: 'landlisting', redirectTo: '/landlisting/page/1', pathMatch: 'full' },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'profile/:id', component: ProfileComponent },
  { path:'profile/ilanlarim', component:ProfileComponent, canActivate:[LoginGuard]},
  
  { path:'listing/add', component:ListingAddComponent, canActivate:[LoginGuard]},
  { path: 'listing/edit/:id', component:ListingEditingComponent, canActivate:[LoginGuard,ListingOwnerGuard]},

  { path:"dashboard", component:AdminDashboardComponent, canActivate:[AdminGuard]},
  { path: "unauthorized", component:UnauthorizedComponent },

  { path: "dashboard/user-management", component:UserManagementComponent}


];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
