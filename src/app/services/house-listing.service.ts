import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleReponseModel';
import { AddHouseListingResponse } from '../models/addHouseListingResponse';
import { HouseDetail } from '../models/houseDetail';
import { UpdateHouse } from '../models/updateHouse';
import { ListResponseModel } from '../models/listResponseModel';
import { HouseListing } from '../models/houseListing';
import { HouseFilter } from '../models/houseFilter';
import { SortingObject } from '../models/sortingObject';
import { HouseListingRequestModel } from '../models/HouseListingRequestModel';

@Injectable({
  providedIn: 'root'
})

export class HouseListingService {

  apiUrl = "https://localhost:44318/api/HouseListings/"

  constructor(private httpClient: HttpClient) { }
  getHouseListing():Observable<ListResponseModel<HouseListing>>{
    return this.httpClient.get<ListResponseModel<HouseListing>>(this.apiUrl+"gethouselistingdtos");

  }

  getHouseDetail(id: string):Observable<SingleResponseModel<HouseDetail>>{
    return this.httpClient.get<SingleResponseModel<HouseDetail>>(this.apiUrl+"getdetails?listingId="+id)
  }

  
  getByFilter(filterObject: HouseFilter):Observable<ListResponseModel<HouseListing>> {
    return this.httpClient.post<ListResponseModel<HouseListing>>(this.apiUrl+"getallbyfilter", filterObject)
      
  }
  addListing(data: any): Observable<SingleResponseModel<AddHouseListingResponse>> {
    return this.httpClient.post<SingleResponseModel<AddHouseListingResponse>>(this.apiUrl+"add", data);
  }


  updateHouse(data: any): Observable<SingleResponseModel<UpdateHouse>>{
    return this.httpClient.post<SingleResponseModel<UpdateHouse>>(this.apiUrl+"update", data)
  }

  getPaginatedListings(filter: HouseFilter | null, sorting: SortingObject |null, pageNumber: number, pageSize: number): Observable<ListResponseModel<HouseListing>> {
    let reguestModel: HouseListingRequestModel = {
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
    return this.httpClient.post<ListResponseModel<HouseListing>>(
      this.apiUrl+"getpaginatedlistings",reguestModel
    );
  }
}
