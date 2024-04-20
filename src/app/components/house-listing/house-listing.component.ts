import { Component } from '@angular/core';
import { HouseListing } from '../../models/houseListing';
import { Router, ActivatedRoute } from '@angular/router';
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

  squareMeter: number=0;
  price: number=0;
  filterObject: any = {};
  filterApiUrl = "https://localhost:44318/api/HouseListings/getallbyfilter"

  city: City[] = [];
  districts: District[] = [];

  currentPage = 1; 
  listingsPerPage = 12;  
  

  constructor(private houseListingService: HouseListingService, private cityService: CityService, private districService: DistrictService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHouseListing();
    this.getCity();
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });
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
      }, error => {
        console.error('API iletişim hatası:', error);
      });
  }

  getHouseListingImagePath(houseListing: HouseListing): string {
    if (houseListing.imagePath && houseListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + houseListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }


  get startIndex(): number {
    return (this.currentPage - 1) * this.listingsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.listingsPerPage;
  }
  
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log(this.currentPage)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  
  get totalPages(): number {
    return Math.ceil(this.houseListings.length / this.listingsPerPage);
  }
  
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  get visiblePages(): number[] {
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(start + 3, this.totalPagesArray.length);

    return Array(end - start + 1).fill(0).map((_, index) => start + index);
}

  
}
