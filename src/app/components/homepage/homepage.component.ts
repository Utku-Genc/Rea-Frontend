import { Listing } from '../../models/listing';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingResponseModel } from '../../models/listingResponseModel';
import { HouseListing } from '../../models/houseListing';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent {
  listings: Listing[] = [];
  apiUrl = "https://localhost:44318/api/Listings/getalldetails"

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getListing()
  }
  getListing = () => {
    this.httpClient.get<ListingResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.listings = response.data;
      });
  }
  getHouseListingImagePath(listing: Listing): string {
    if (listing.imagePath && listing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + listing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }
}
