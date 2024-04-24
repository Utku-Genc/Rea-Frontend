import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UserImage } from '../models/userImage';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  apiUrl = "https://localhost:44318/api/UserImages/"
  constructor(private httpClient: HttpClient) { }
  getUserImageByToken(): Observable<ListResponseModel<UserImage>> {
    return this.httpClient.get<ListResponseModel<UserImage>>(this.apiUrl + "getbytoken");
  }

  getUserImageByUserId(userId:number): Observable<ListResponseModel<UserImage>> {
    return this.httpClient.get<ListResponseModel<UserImage>>(this.apiUrl + "getallbyuserid?userId="+userId);
  }
  
  addUserImageByToken(imageFile: FormData): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "add", imageFile);
}

  deleteUserImage(): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deleteallimages", {})
  }
}
  