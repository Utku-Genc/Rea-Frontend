import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { HttpClient } from '@angular/common/http';
import { ListingResponseModel } from '../../models/listingResponseModel';

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {

  listings: Listing[] = [];
  apiUrl = "https://localhost:44318/api/Listings/getalldetails"
  // listingResponseModel: ListResponseModel = {            ihtiyaç kalmadı
  //   data:this.listing,
  //   message:"",
  //   success:true
  // };

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

}