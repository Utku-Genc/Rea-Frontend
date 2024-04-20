import { Component } from '@angular/core';
import { HouseListing } from '../../models/houseListing';
import { Router } from '@angular/router';
import { HouseListingService } from '../../services/house-listing.service';
import { HttpClient } from '@angular/common/http';
import { HouseFilter } from '../../models/houseFilter';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { CityService } from '../../services/city.service';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'house-listing',
  templateUrl: './house-listing.component.html',
  styleUrl: './house-listing.component.css'
})
export class HouseListingComponent {
  houseListings: HouseListing[] = [];
  value: number=0;

  squareMeter: number=0;
  price: number=0;
  filterObject: any = {};
  filterApiUrl = "https://localhost:44318/api/HouseListings/getallbyfilter"

  city: City[] = [];
  districts: District[] = [];



  constructor(private houseListingService: HouseListingService, private cityService: CityService, private districService: DistrictService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getHouseListing();
    this.getCity()
  }


  getHouseListing() {
    this.houseListingService.getHouseListing().subscribe(response => {
      this.houseListings = response.data;
    })

  }

  filterHouseListings(filterObject: HouseFilter) {
    this.httpClient.post<HouseListing[]>(this.filterApiUrl, filterObject)
      .subscribe((response) => {
        this.houseListings = response;
      });
  }

  getCity() {
    this.cityService.getCity().subscribe(response => {
      this.city = response.data;
    })
  }

onCityChange(event: any) {
    const cityName = event.target.value;
    if (cityName) {
        this.getDistrict(cityName);
    } else {
        this.districts = []; // Şehir seçilmediyse ilçe listesini temizle
    }
}



  getDistrict(cityName: string) {
    this.districService.getDistrictByName(cityName).subscribe(respone => {
      this.districts = respone.data;
    })
  }

  onSubmit() {
    if(this.filterObject.minSquareMeter > this.filterObject.maxSquareMeter){
      this.squareMeter = this.filterObject.minSquareMeter;
      this.filterObject.minSquareMeter = this.filterObject.maxSquareMeter;
      this.filterObject.maxSquareMeter = this.squareMeter;
    }

    if(this.filterObject.minPrice > this.filterObject.maxPrice){
      this.price = this.filterObject.minPrice;
      this.filterObject.minPrice = this.filterObject.maxPrice;
      this.filterObject.maxPrice = this.price;
    }

    this.httpClient.post<any>(this.filterApiUrl, this.filterObject)
      .subscribe(response => {
        this.houseListings = response.data
        console.log(response);
        // Burada alınan verileri kullanabilirsin, örneğin bir liste gösterebilirsin.
      }, error => {
        console.error('API iletişim hatası:', error);
      });
  }
  // lower(){
  //   if(this.value>0){
  //     this.value= this.value-4
  //   }
  // }
  // upper(){
  //   if(this.value>0){
  //     this.value= this.value+4
  //   }
  // }


  getHouseListingImagePath(houseListing: HouseListing): string {
    if (houseListing.imagePath && houseListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + houseListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }
}

