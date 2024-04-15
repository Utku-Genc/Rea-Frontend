import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListingComponent } from './components/listing/listing.component';
import { IlanComponent } from './components/ilan/ilan.component';



const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'listing/:page', component: ListingComponent },
  { path: 'detail/:typeName/:id', component: DetailComponent },
  { path: 'ilan', component: IlanComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
