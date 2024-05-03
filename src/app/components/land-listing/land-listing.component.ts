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
import { SortDirection, SortingObject } from '../../models/sortingObject';

@Component({
  selector: 'app-land-listing',
  templateUrl: './land-listing.component.html',
  styleUrl: './land-listing.component.css'
})
export class LandListingComponent implements OnInit {

  landListing : LandListing[] = [];

  currentPage = 1; 
  listingsPerPage = 21; 
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

  sorting: SortingObject = {
    sortBy: "date",
    sortDirection: SortDirection.Descending
  }
  selectedSorting: string="date-1";


  constructor(
    private landListingService: LandListingService, 
    private route: ActivatedRoute, private router:Router,
    private cityService: CityService,
    private districService: DistrictService, 
    private toastrService:ToastrService,
    private listingTypeService: ListingTypeService, 
  ){}

  ngOnInit(): void {
    this.getListingByPage(this.currentPage,this.listingsPerPage);
    this.getCity();
    this.getListingTypes();

    
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'].toNumber() || 1;
    });
  }

  getLandListing() {
    console.log("getLand")
    this.landListingService.getLandListing().subscribe(response => {
      this.landListing = response.data;
    })

  }

  getListingByPage(page: number, pageSize: number) {

    this.landListingService.getPaginatedListings(this.filterObject, this.sorting, this.currentPage, this.listingsPerPage).subscribe(response => {
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

  reset() {
    this.sorting = {
      sortBy: "date",
      sortDirection: SortDirection.Descending
    }
    this.selectedSorting = "date-1";
    this.filterObject ={
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
    this.getListingByPage(this.currentPage, this.listingsPerPage)
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

  setSorting() {
    if (this.selectedSorting) {
      const [sortBy, sortDirection] = this.selectedSorting.split('-');
      this.sorting.sortBy = sortBy;
      this.sorting.sortDirection = +sortDirection; // "+" kullanarak stringi number'a çeviriyoruz
      this.currentPage = 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage);
    }
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


      this.router.navigateByUrl(`/Landlisting/page/1`);
    this.currentPage = 1

    this.getListingByPage(this.currentPage, this.listingsPerPage)
  }

  previousPage() {
    if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getListingByPage(this.currentPage, this.listingsPerPage);
      this.router.navigateByUrl(`/landlisting/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }


  nextPage() {
    if (this.landListing.length < this.listingsPerPage) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else {
      this.currentPage = this.currentPage + 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage);

      this.router.navigateByUrl(`/landlisting/page/${this.currentPage}`); // Sadece link kısmını güncelle

    }
  }

  setPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getListingByPage(this.currentPage, this.listingsPerPage);
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


  
}
