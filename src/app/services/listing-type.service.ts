import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ListingType } from '../models/listingType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingTypeService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:44318/api/ListingTypes/"

  getAll():Observable<ListResponseModel<ListingType>>{
    return this.httpClient.get<ListResponseModel<ListingType>>(this.apiUrl+"getall")
  }
}
