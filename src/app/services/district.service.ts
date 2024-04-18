import { Injectable } from '@angular/core';
import { DistrictResponseModel } from '../models/districtResponseModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiUrl = "https://localhost:44318/api/Districts/"

  constructor(private httpClient: HttpClient) { }

  getDistrict(id: number):Observable<DistrictResponseModel>{
    return this.httpClient.get<DistrictResponseModel>(this.apiUrl+'getbycityid?cityId='+id);
  }

  getDistrictByName(cityName: string):Observable<DistrictResponseModel>{
    return this.httpClient.get<DistrictResponseModel>(this.apiUrl+'getbycityname?cityName='+cityName);
  }
}
