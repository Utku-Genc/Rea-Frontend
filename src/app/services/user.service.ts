import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { SingleResponseModel } from '../models/singleReponseModel';

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

}
