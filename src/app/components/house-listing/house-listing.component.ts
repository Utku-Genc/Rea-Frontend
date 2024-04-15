import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HouseListingResponseModel } from '../../models/houseListingResponseModel';
import { HouseListing } from '../../models/houseListing';

@Component({
  selector: 'house-listing',
  templateUrl: './house-listing.component.html',
  styleUrl: './house-listing.component.css'
})
export class HouseListingComponent {
  houseListings: HouseListing[] = [];
  apiUrl = "https://localhost:44318/api/HouseListings/gethouselistingdtos"

constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getHouseListing()
  }
  getHouseListing = () => {
    this.httpClient.get<HouseListingResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.houseListings = response.data;
      });
  }
}

