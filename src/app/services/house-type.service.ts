import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { HouseType } from '../models/houseType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseTypeService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:44318/api/HouseTypes/"
  getAll():Observable<ListResponseModel<HouseType>>{
    return this.httpClient.get<ListResponseModel<HouseType>>(this.apiUrl+"getall")
  }
}
