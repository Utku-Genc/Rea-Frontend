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



const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: ':listingName/detail/:id', component: DetailComponent },
  { path: 'listing', component: IlanComponent },
  { path: 'houselisting', component: HouseListingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile/:id', component: ProfileComponent , canActivate:[LoginGuard]},
  {path:'profile/ilanlarim', component:ProfileComponent, canActivate:[LoginGuard]}

];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
