import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddLandListing } from '../models/addLandListing';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';
import { SingleResponseModel } from '../models/singleReponseModel';
import { AddLandListingResponse } from '../models/addLandListingResponse';

@Injectable({
  providedIn: 'root'
})
export class AddLandService {

  apiUrl = "https://localhost:44318/api/LandListings/add";
  
  constructor(private httpClient: HttpClient) { }

  addLandListing(data: any): Observable<SingleResponseModel<AddLandListingResponse>> {
    return this.httpClient.post<SingleResponseModel<AddLandListingResponse>>(this.apiUrl, data);
  }
}
