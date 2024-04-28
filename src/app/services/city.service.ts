import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { City } from '../models/city';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = "https://localhost:44318/api/Cities/getall"
  
  constructor(private httpClient: HttpClient) { }

  getCity():Observable<ListResponseModel<City>>{
    return this.httpClient.get<ListResponseModel<City>>(this.apiUrl);
  }
}
