import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { SingleResponseModel } from '../models/singleReponseModel';
import { UserFilter } from '../models/userFilter';
import { UserRequestModel } from '../models/userRequestModel';
import { SortingObject } from '../models/sortingObject';
import { UserFull } from '../models/userFull';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl ="https://localhost:44318/api/User/"
  constructor(private httpClient: HttpClient) { }
getUserByToken(): Observable<SingleResponseModel<User>>{
  return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getuserdetailsbytoken");

}
getUserById(userId:number):Observable<SingleResponseModel<User>>{
  return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getuserdetailsbyid?userId="+userId)
}


getUserCount():Observable<SingleResponseModel<number>>{
  return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getusercount");
}
getActiveUserCount():Observable<SingleResponseModel<number>>{
  return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getactiveusercount");
}
getPassiveUserCount():Observable<SingleResponseModel<number>>{
  return this.httpClient.get<SingleResponseModel<number>>(this.apiUrl+"getpassiveusercount");
}

getLatestUsers(pageSize:number):Observable<ListResponseModel<User>>{
  return this.httpClient.get<ListResponseModel<User>>(this.apiUrl+"getlatestusers?pageSize="+pageSize);
}

getUserStatus(userId:number):Observable<SingleResponseModel<boolean>>{
  return this.httpClient.get<SingleResponseModel<boolean>>(this.apiUrl+"getuserstatus?userId="+userId);
}

getPaginatedUsers(filter: UserFilter | null, sorting: SortingObject |null, pageNumber: number, pageSize: number): Observable<ListResponseModel<UserFull>> {
  let reguestModel: UserRequestModel = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    filter: null,
    sorting: null
  };
  if(filter){
    reguestModel.filter = filter
  }
  if(sorting){
    reguestModel.sorting = sorting
  }
  console.log(reguestModel);
  return this.httpClient.post<ListResponseModel<UserFull>>(
    this.apiUrl+"getpaginatedusers",reguestModel
  );
}

}
