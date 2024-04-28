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

}
