import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Listing } from '../models/listing';
import { ListingFilter } from '../models/listingFilter';
import { SortingObject } from '../models/sortingObject';
import { ListingRequestModel } from '../models/listingRequestModel';
import { SingleResponseModel } from '../models/singleReponseModel';

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

  getPaginatedListings(filter: ListingFilter | null, sorting: SortingObject |null, pageNumber: number, pageSize: number): Observable<ListResponseModel<Listing>> {
    let reguestModel: ListingRequestModel = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filter: null,
      sorting: null
    };
    if(filter){
      reguestModel.filter = filter
    }
    if(sorting){
      reguestModel.sorting = sorting
    }
    console.log(reguestModel);
    return this.httpClient.post<ListResponseModel<Listing>>(
      this.apiUrl+"getpaginatedlistings",reguestModel
    );
  }

  getListingCount():Observable<SingleResponseModel<number>>{
    return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getlistingcount");
  }
  getActiveListingCount():Observable<SingleResponseModel<number>>{
    return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getactivelistingcount");
  }
  getPassiveListingCount():Observable<SingleResponseModel<number>>{
    return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getpassivelistingcount");
  }

  getListingStatus(listingId:number):Observable<SingleResponseModel<boolean>>{
    return this.httpClient.get<SingleResponseModel<boolean>>(this.apiUrl+"getlistingstatus?listingId="+listingId);
  }
  
  
}