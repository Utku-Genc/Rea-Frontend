import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HouseFilter } from '../../models/houseFilter';

@Component({
  selector: 'house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.css']
})
export class HouseFilterComponent {
  filterObject: any = {}; // Bu, filtre nesnesini temsil eder. Formdaki alanlar buraya bağlanacak.

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Form verilerini API'ye gönder
    this.http.post<any>('https://localhost:44318/api/HouseListings/getallbyfilter', this.filterObject)
      .subscribe(response => {
        // API yanıtını işle
        console.log(response);
        // Burada alınan verileri kullanabilirsin, örneğin bir liste gösterebilirsin.
      }, error => {
        console.error('API iletişim hatası:', error);
      });
  }
}