import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddLandListing } from '../models/addLandListing';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddLandService {

  apiUrl = "https://localhost:44318/api/LandListing/add";
  
  constructor(private httpClient: HttpClient) { }

  addLandListing(data: any): Observable<ListResponseModel<AddLandListing>> {
    return this.httpClient.post<ListResponseModel<AddLandListing>>(this.apiUrl, data);
  }
}
