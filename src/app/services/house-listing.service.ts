import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HouseListingResponseModel } from '../models/houseListingResponseModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleReponseModel';
import { AddHouseListingResponse } from '../models/addHouseListingResponse';
import { HouseDetail } from '../models/houseDetail';
import { UpdateHouse } from '../models/updateHouse';

@Injectable({
  providedIn: 'root'
})

export class HouseListingService {

  apiUrl = "https://localhost:44318/api/HouseListings/"

  constructor(private httpClient: HttpClient) { }
  getHouseListing():Observable<HouseListingResponseModel>{
    return this.httpClient.get<HouseListingResponseModel>(this.apiUrl+"gethouselistingdtos");

  }

  getHouseDetail(id: string):Observable<SingleResponseModel<HouseDetail>>{
    return this.httpClient.get<SingleResponseModel<HouseDetail>>(this.apiUrl+"getdetails?listingId="+id)
  }

  addListing(data: any): Observable<SingleResponseModel<AddHouseListingResponse>> {
    return this.httpClient.post<SingleResponseModel<AddHouseListingResponse>>(this.apiUrl+"add", data);
  }


  updateHouse(data: any): Observable<SingleResponseModel<UpdateHouse>>{
    return this.httpClient.post<SingleResponseModel<UpdateHouse>>(this.apiUrl+"update", data)
  }
}
