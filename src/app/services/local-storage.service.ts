import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string, value:any){
    localStorage.setItem(key, value); // Doğrudan value'yu kaydediyoruz. Başinda ki tırnakları kaldırıdım
  }

  getItem(key:string){
    let value = localStorage.getItem(key); // localStorage'dan değeri alıyoruz
    if(value){
      try {
        return JSON.parse(value); // JSON formatındaki değeri JavaScript nesnesine dönüştürüyoruz
      } catch (error) {
        return value; // JSON.parse hatası alınırsa, değeri olduğu gibi döndürüyoruz
      }
    }
    return null; // Değer bulunamadıysa null döndürüyoruz
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
