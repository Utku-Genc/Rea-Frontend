import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';
import { LandListing } from '../models/landListing';
import { LandDetail } from '../models/landDetail';
import { SingleResponseModel } from '../models/singleReponseModel';
import { AddLandListingResponse } from '../models/addLandListingResponse';
import { LandFilter } from '../models/landFilter';
import { UpdateLand } from '../models/updateLand';
import { SortingObject } from '../models/sortingObject';

@Injectable({
  providedIn: 'root'
})
export class LandListingService {
  apiUrl = "https://localhost:44318/api/LandListings/";

  constructor(private httpClient: HttpClient) { }
  getLandListing(): Observable<ListResponseModel<LandListing>> {
    return this.httpClient.get<ListResponseModel<LandListing>>(this.apiUrl+"getlandlistings");
  }
  
  getLandListingDetail(id:string): Observable<SingleResponseModel<LandDetail>> {
    return this.httpClient.get<SingleResponseModel<LandDetail>>(this.apiUrl+"getlandlistingdetail?listingId="+id);
  }
  addLandListing(data: any): Observable<SingleResponseModel<AddLandListingResponse>> {
    return this.httpClient.post<SingleResponseModel<AddLandListingResponse>>(this.apiUrl+"add", data);
  }

  getAllByFilter(filter:LandFilter): Observable<ListResponseModel<LandListing>>{
    return this.httpClient.post<ListResponseModel<LandListing>>(this.apiUrl + "getallbyfilter", filter);
  }

  updateLand(data: any):Observable<SingleResponseModel<UpdateLand>>{
    return this.httpClient.post<SingleResponseModel<UpdateLand>>(this.apiUrl + "update", data);
  }

  getPaginatedListings(filter: LandFilter, sorting: SortingObject, pageNumber: number, pageSize: number): Observable<ListResponseModel<LandListing>> {
    return this.httpClient.get<ListResponseModel<LandListing>>(
      `${this.apiUrl}getpaginatedlistings?pageNumber=${pageNumber}&pageSize=${pageSize}&` +
      `filter=${JSON.stringify(filter)}&sorting=${JSON.stringify(sorting)}`
    );
  }
}
