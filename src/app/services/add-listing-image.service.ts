import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddListingImageService {
  apiUrl = "https://localhost:44318/api/ListingImages/add";

  constructor(private httpClient: HttpClient) { }
  uploadImage( listingId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('listingId', JSON.stringify(listingId)); // Gerekirse JSON olarak gönderebilirsiniz

    return this.httpClient.post<any>(this.apiUrl, formData);
  }
}