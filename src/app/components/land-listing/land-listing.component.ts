import { Component, OnInit } from '@angular/core';
import { LandListingService } from '../../services/land-listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LandListing } from '../../models/landListing';
import { LandFilter } from '../../models/landFilter';
import { DistrictService } from '../../services/district.service';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { ToastrService } from 'ngx-toastr';
import { ListingTypeService } from '../../services/listing-type.service';
import { ListingType } from '../../models/listingType';

@Component({
  selector: 'app-land-listing',
  templateUrl: './land-listing.component.html',
  styleUrl: './land-listing.component.css'
})
export class LandListingComponent implements OnInit {

  landListing : LandListing[] = [];

  currentPage = 1; 
  listingsPerPage = 12; 
  filterObject: LandFilter= {
    cityId:null,
    districtId:null,
    floorEquivalen:null,
    listingTypeId:null,
    maxPrice:null,
    maxSquareMeter:null,
    minPrice:null,
    minSquareMeter:null,
    searchText:null
  }

  city: City[] = [];
  districts: District[] = [];
  listingTypes: ListingType[] = [];
  squareMeter: number=0;
  price: number=0;

  constructor(
    private landListingService: LandListingService, 
    private route: ActivatedRoute, private router:Router,
    private cityService: CityService,
    private districService: DistrictService, 
    private toastrService:ToastrService,
    private listingTypeService: ListingTypeService, 
  ){}

  ngOnInit(): void {
    this.getLandListing();
    this.getCity();
    this.getListingTypes();

    
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });
  }

  getLandListing() {
    console.log("getLand")
    this.landListingService.getLandListing().subscribe(response => {
      this.landListing = response.data;
    })

  }

  getLandListingImagePath(landListing: LandListing): string {
    if (landListing.imagePath && landListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + landListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }


  getCity() {
    this.cityService.getCity().subscribe(response => {
      this.city = response.data;
    })
  }

  onCityChange(event: any) {
    const cityId = event.target.value;
    if (cityId > 0) {
      this.getDistrict(cityId);
    }else if(cityId ==  undefined){
      this.districts = [];
    } 
    else {
      this.districts = []; // Şehir seçilmediyse ilçe listesini temizle
    }
  }



  getDistrict(cityId: number) {
    this.districService.getDistrict(cityId).subscribe(respone => {
      this.districts = respone.data;
    })
  }

  getListingTypes() {
    this.listingTypeService.getAll().subscribe(response => {
      this.listingTypes = response.data;
    })
  }
  onSubmit() {
    if(this.filterObject.minSquareMeter && this.filterObject.maxSquareMeter &&  this.filterObject.minSquareMeter > this.filterObject.maxSquareMeter){
      this.squareMeter = this.filterObject.minSquareMeter;
      this.filterObject.minSquareMeter = this.filterObject.maxSquareMeter;
      this.filterObject.maxSquareMeter = this.squareMeter;
    }

    if(this.filterObject.minPrice && this.filterObject.maxPrice && this.filterObject.minPrice > this.filterObject.maxPrice){
      this.price = this.filterObject.minPrice;
      this.filterObject.minPrice = this.filterObject.maxPrice;
      this.filterObject.maxPrice = this.price;
    }

    this.landListingService.getAllByFilter(this.filterObject).subscribe(response => {
        this.landListing = response.data
        console.log(response);
        this.toastrService.success("Başarıyla Filtrelendi","İşlem Başarılı")
      }, error => {
        this.toastrService.error("Bir hata ile karşılaşıldı","Hata")
      });
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
    return Math.ceil(this.landListing.length / this.listingsPerPage);
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
