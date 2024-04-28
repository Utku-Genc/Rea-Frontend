import { Listing } from '../../models/listing';
import { Component, OnInit } from '@angular/core';
import { HouseListing } from '../../models/houseListing';
import { LandListing } from '../../models/landListing';
import { HouseListingService } from '../../services/house-listing.service';
import { LandListingService } from '../../services/land-listing.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent {
  searchText: string = "";
  listings: Listing[] = [];
  houseListings: HouseListing[] = [];
  landListings: LandListing[] = [];


  constructor(
     private houseListingService: HouseListingService, 
     private landListingService: LandListingService,
     private listingService: ListingService,
    ) { }

  ngOnInit(): void {
    this.getListing();
    this.getHouseListing();
    this.getLandListing()

  }
  getListing = () => {
      this.listingService.getListing().subscribe((response) => {
        this.listings = response.data;
      });
  }

  getHouseListing() {
    this.houseListingService.getHouseListing().subscribe(response => {
      this.houseListings = response.data;
    })
  }

  getLandListing() {
    this.landListingService.getLandListing().subscribe(response => {
      this.landListings = response.data;
    })
  }
  
  getHouseListingImagePath(imagePath: string): string {
    if (imagePath && imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }

}
