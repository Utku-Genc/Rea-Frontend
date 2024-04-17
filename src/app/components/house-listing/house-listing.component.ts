import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HouseListingResponseModel } from '../../models/houseListingResponseModel';
import { HouseListing } from '../../models/houseListing';
import { Router } from '@angular/router';

@Component({
  selector: 'house-listing',
  templateUrl: './house-listing.component.html',
  styleUrl: './house-listing.component.css'
})
export class HouseListingComponent {
  houseListings: HouseListing[] = [];
  apiUrl = "https://localhost:44318/api/HouseListings/gethouselistingdtos"

  listingPerPage: HouseListing[] = [];
  listingLength: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 4;

constructor(private httpClient: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.getHouseListing()
  }


  getHouseListing = () => {
    this.httpClient.get<HouseListingResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.houseListings = response.data;
      });
  }


  getHouseListingImagePath(houseListing: HouseListing): string {
    if (houseListing.imagePath && houseListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + houseListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }
}

