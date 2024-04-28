import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListingResponseModel } from '../models/listingResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  apiUrl = "https://localhost:44318/api/Listings/"

  constructor(private httpClient: HttpClient) { }
  getListing(): Observable<ListingResponseModel> {
    return this.httpClient.get<ListingResponseModel>(this.apiUrl+"getalldetails");
  }
  getListingByUserId(userId:number):Observable<ListingResponseModel> {
    return this.httpClient.get<ListingResponseModel>(this.apiUrl+"getbyuserid?userId="+userId);
  }
  getByToken(){
    return this.httpClient.get<ListResponseModel<Listing>>(this.apiUrl+"getbytoken");
  }
  deleteListing(listingId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deletebyid?listingId="+listingId,{})
  }
  
}