import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { AddHouseListing } from '../models/addHouseListing';

@Injectable({
  providedIn: 'root'
})
export class AddHouseService {

  apiUrl = "https://localhost:44318/api/HouseListings/add";
  
  constructor(private httpClient: HttpClient) { }

  addListing(data: any): Observable<ListResponseModel<AddHouseListing>> {
    return this.httpClient.post<ListResponseModel<AddHouseListing>>(this.apiUrl, data);
  }
}