import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailComponent } from './components/detail/detail.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { HouseListingComponent } from './components/house-listing/house-listing.component';



const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: ':listingName/detail/:typeName/:id', component: DetailComponent },
  { path: 'listing', component: IlanComponent },
  { path: 'houselisting', component: HouseListingComponent},

];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
