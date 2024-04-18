import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HouseListingResponseModel } from '../models/houseListingResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HouseListingService {

  apiUrl = "https://localhost:44318/api/HouseListings/gethouselistingdtos"

  constructor(private httpClient: HttpClient) { }
  getHouseListing():Observable<HouseListingResponseModel>{
    return this.httpClient.get<HouseListingResponseModel>(this.apiUrl);

  }
}
