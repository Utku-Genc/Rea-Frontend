import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { operationClaims } from '../models/operationClaims';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimsService {
  apiUrl = "https://localhost:44318/api/OperationClaims/"
  constructor(private httpClient: HttpClient) { 

  }

  getAll() :Observable<ListResponseModel<operationClaims>>{
    return this.httpClient.get<ListResponseModel<operationClaims>>(this.apiUrl+"getall")
  }
}
