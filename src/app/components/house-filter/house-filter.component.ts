import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HouseFilter } from '../../models/houseFilter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'house-filter',
  templateUrl: './house-filter.component.html',
  styleUrls: ['./house-filter.component.css']
})
export class HouseFilterComponent {
  filterObject: any = {}; 

  constructor(private http: HttpClient,private toastrService:ToastrService) {}

  onSubmit() {
    this.http.post<any>('https://localhost:44318/api/HouseListings/getallbyfilter', this.filterObject)
      .subscribe(response => {
        this.toastrService.success("Başarıyla Filtrelendi","İşlem Başarılı")
        console.log(response);
      }, error => {
        this.toastrService.error("Bir Hatayla karşılaşıldı"+error.error.ErrorMessage,"Hata")
      });
  }
}