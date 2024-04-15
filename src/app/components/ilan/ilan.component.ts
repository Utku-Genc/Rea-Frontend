import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { HttpClient } from '@angular/common/http';
import { ListingResponseModel } from '../../models/listingResponseModel';

@Component({
  selector: 'ilan',
  templateUrl: './ilan.component.html',
  styleUrl: './ilan.component.css'
})
export class IlanComponent implements OnInit {

  listings: Listing[] = [];
  apiUrl = "https://localhost:44318/api/Listings/getalldetails"

constructor(private httpClient: HttpClient){}

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
