import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleReponseModel';
import { UserRoles } from '../models/userRoles';
import { ListResponseModel } from '../models/listResponseModel';
import { AddUserRoleResponse } from '../models/addUserRole';
import { DeleteUserRoleResponse } from '../models/deleteUserRole';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimsService {

  apiUrl = "https://localhost:44318/api/UserOperationClaims/"
  
  constructor(private httpClient: HttpClient) { }

  getByUserId(userId: number):Observable<ListResponseModel<UserRoles>>{
    return this.httpClient.get<ListResponseModel<UserRoles>>(this.apiUrl+"getbyuserid?userId="+ userId)
  }

  addUserRole(data: any): Observable<SingleResponseModel<AddUserRoleResponse>> {
    return this.httpClient.post<SingleResponseModel<AddUserRoleResponse>>(this.apiUrl+"add", data);
  }

  deleteUserRole(data: any): Observable<SingleResponseModel<DeleteUserRoleResponse>> {
    return this.httpClient.post<SingleResponseModel<DeleteUserRoleResponse>>(this.apiUrl+"delete", data);
  }
}
