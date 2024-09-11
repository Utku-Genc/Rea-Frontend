import { Listing } from '../../models/listing';
import { Component, OnInit } from '@angular/core';
import { HouseListing } from '../../models/houseListing';
import { LandListing } from '../../models/landListing';
import { HouseListingService } from '../../services/house-listing.service';
import { LandListingService } from '../../services/land-listing.service';
import { ListingService } from '../../services/listing.service';
import { ListingFilter } from '../../models/listingFilter';
import { SortingObject } from '../../models/sortingObject';
import { HouseFilter } from '../../models/houseFilter';
import { LandFilter } from '../../models/landFilter';

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

  filterObject: ListingFilter = {
    cityId: null,
    districtId: null,
    listingTypeId: null,
    maxPrice: null,
    maxSquareMeter: null,
    minPrice: null,
    minSquareMeter: null,
    searchText: null,
    listingStatus: true,
    propertyTypeId: null, // Arsa, ev gibi türler için
    date: null // İlanın eklenme tarihi
}


  constructor(
     private houseListingService: HouseListingService, 
     private landListingService: LandListingService,
     private listingService: ListingService,
    ) { }

  ngOnInit(): void {
    this.getListingByPage(1,6);
    this.getHouseListingByPage(1,6);
    this.getLandListingByPage(1,6);


  }
  getListingByPage(page:number,pageSize:number){
    let sortingObject! : SortingObject
    this.listingService.getPaginatedListings(this.filterObject,sortingObject,1,6).subscribe(response=>{
      this.listings = response.data;
    })
  }
  getHouseListingByPage(page:number,pageSize:number){
    let filter! : HouseFilter
    let sortingObject! : SortingObject
    this.houseListingService.getPaginatedListings(filter,sortingObject,1,6).subscribe(response=>{
      this.houseListings = response.data;
    })
  }
  getLandListingByPage(page:number,pageSize:number){
    let filter! : LandFilter
    let sortingObject! : SortingObject
    this.landListingService.getPaginatedListings(filter,sortingObject,1,6).subscribe(response=>{
      this.landListings = response.data;
    })
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
