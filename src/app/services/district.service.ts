import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiUrl = "https://localhost:44318/api/Districts/"

  constructor(private httpClient: HttpClient) { }

  getDistrict(id: number):Observable<ListResponseModel<District>>{
    return this.httpClient.get<ListResponseModel<District>>(this.apiUrl+'getbycityid?cityId='+id);
  }

  getDistrictByName(cityName: string):Observable<ListResponseModel<District>>{
    return this.httpClient.get<ListResponseModel<District>>(this.apiUrl+'getbycityname?cityName='+cityName);
  }
}
