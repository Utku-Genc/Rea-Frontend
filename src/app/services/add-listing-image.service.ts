import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddListingImageService {
  apiUrl = "https://localhost:44318/api/ListingImages/add";

  constructor(private httpClient: HttpClient) { }
  addImages(listingId: number, images: FileList): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i], images[i].name);
    }
    formData.append('listingId', listingId.toString());
    return this.httpClient.post<any>(this.apiUrl, formData);
  }
}