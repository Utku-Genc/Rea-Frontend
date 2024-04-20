import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string, value:any){
    let json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  getItem(key:string){
    let json = localStorage.getItem(key);
    if(json){
      let value = JSON.parse(json);
      return value;
    }
    return null;
  }

  isSaved(key: string) {
    if (localStorage.getItem(key)) {
      return true;
    }
    return false;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }

}
