import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListingResponseModel } from '../models/listingResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  apiUrl = "https://localhost:44318/api/Listings/"

  constructor(private httpClient: HttpClient) { }
  getListing(): Observable<ListingResponseModel> {
    return this.httpClient.get<ListingResponseModel>(this.apiUrl+"getalldetails");
  }
  getListingByUserId():Observable<ListingResponseModel> {
    return this.httpClient.get<ListingResponseModel>(this.apiUrl+"getbyuserid");
  }
}