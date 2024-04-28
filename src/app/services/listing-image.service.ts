import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { ListingImage } from '../models/listingImage';

@Injectable({
  providedIn: 'root'
})
export class ListingImageService {
  apiUrl = "https://localhost:44318/api/ListingImages/";

  constructor(private httpClient: HttpClient) { }

  getImage(listingId: string | null) :Observable<ListResponseModel<ListingImage>>{
    return this.httpClient.get<ListResponseModel<ListingImage>>(this.apiUrl+"getbylistingid?listingId=" + listingId)
  }

  uploadImage( listingId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('listingId', JSON.stringify(listingId)); // Gerekirse JSON olarak gönderebilirsiniz

    return this.httpClient.post<any>(this.apiUrl + "add", formData);
  }
}