import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Listing } from '../models/listing';
import { ListingFilter } from '../models/listingFilter';
import { SortingObject } from '../models/sortingObject';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  apiUrl = "https://localhost:44318/api/Listings/"

  constructor(private httpClient: HttpClient) { }
  getListing(): Observable<ListResponseModel<Listing>> {
    return this.httpClient.get<ListResponseModel<Listing>>(this.apiUrl+"getalldetails");
  }
  getListingByUserId(userId:number):Observable<ListResponseModel<Listing>> {
    return this.httpClient.get<ListResponseModel<Listing>>(this.apiUrl+"getbyuserid?userId="+userId);
  }

  getByFilter(filterObject: any): Observable<ListResponseModel<Listing>>{
    return this.httpClient.post<any>(this.apiUrl + "getallbyfilter", filterObject);
  }

  getByToken(){
    return this.httpClient.get<ListResponseModel<Listing>>(this.apiUrl+"getbytoken");
  }
  deleteListing(listingId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deletebyid?listingId="+listingId,{})
  }
  getPaginatedListings(filter: ListingFilter, sorting: SortingObject, pageNumber: number, pageSize: number): Observable<ListResponseModel<Listing>> {
    return this.httpClient.get<ListResponseModel<Listing>>(
      `${this.apiUrl}getpaginatedlistings?pageNumber=${pageNumber}&pageSize=${pageSize}&` +
      `filter=${JSON.stringify(filter)}&sorting=${JSON.stringify(sorting)}`
    );
  }
  
}