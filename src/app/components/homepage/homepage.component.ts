import { Listing } from '../../models/listing';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingResponseModel } from '../../models/listingResponseModel';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})


export class HomepageComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8]; // veya dizi uzunluğuna göre herhangi bir veri

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
}

