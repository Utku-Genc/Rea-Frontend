import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleReponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44318/api/auth/"


  constructor(private httpClient:HttpClient, private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  isAuthenticated(){
    const expirationString = this.localStorageService.getItem("expiration");
    const expirationDate = new Date(expirationString);
    if(this.localStorageService.getItem("token") &&  Date.now() < expirationDate.getTime()){
      console.log(Date.now()+"  "+expirationDate.getTime());
      return true;
    }
    else{
      this.logOut()
      window.location.reload()
      return false;
    }
  }

  logOut(){
    this.localStorageService.remove("token");
    this.localStorageService.remove("expiration");
  }

}
