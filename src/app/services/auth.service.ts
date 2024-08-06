import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleReponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { getLocaleDateFormat } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

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
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }

  getUserRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return Array.isArray(roles) ? roles : [roles];
    }
    return [];
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('admin');
  }


  logOut(){
    this.localStorageService.remove("token");
    this.localStorageService.remove("expiration");
  }

}
