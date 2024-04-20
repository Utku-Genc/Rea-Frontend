import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HouseFilter } from '../../models/houseFilter';

@Component({
  selector: 'house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.css']
})
export class HouseFilterComponent {
  filterObject: any = {}; 

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('https://localhost:44318/api/HouseListings/getallbyfilter', this.filterObject)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('API iletişim hatası:', error);
      });
  }
}