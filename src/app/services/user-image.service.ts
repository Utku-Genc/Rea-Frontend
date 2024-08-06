import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UserImage } from '../models/userImage';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { map } from 'rxjs';
import { SingleResponseModel } from '../models/singleReponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  apiUrl = "https://localhost:44318/api/UserImages/"
  public defaultUserImage = 'https://localhost:44318/Uploads/UserImages/DefaultUserImage.png'
  constructor(private httpClient: HttpClient) { }
  getUserImageByToken(): Observable<ListResponseModel<UserImage>> {
    return this.httpClient.get<ListResponseModel<UserImage>>(this.apiUrl + "getbytoken");
  }

  getUserImageByUserId(userId:number): Observable<ListResponseModel<UserImage>> {
    return this.httpClient.get<ListResponseModel<UserImage>>(this.apiUrl + "getallbyuserid?userId="+userId);
  }

  getProfileImagePath(userId:number): Observable<SingleResponseModel<string>> {
    return this.httpClient.get<SingleResponseModel<string>>(this.apiUrl+"getprofileimagepath?=userId"+userId);
  }
  
  addUserImageByToken(imageFile: FormData): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "add", imageFile);
}

  deleteUserImage(): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deleteallimages", {})
  }
}
  