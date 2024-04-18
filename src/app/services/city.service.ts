import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CityResponseModel } from '../models/cityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = "https://localhost:44318/api/Cities/getall"
  
  constructor(private httpClient: HttpClient) { }

  getCity():Observable<CityResponseModel>{
    return this.httpClient.get<CityResponseModel>(this.apiUrl);
  }
}
