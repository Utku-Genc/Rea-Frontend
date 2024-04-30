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
import { ToastrService } from 'ngx-toastr';
import { HouseTypeService } from '../../services/house-type.service';
import { ListingTypeService } from '../../services/listing-type.service';
import { HouseType } from '../../models/houseType';
import { ListingType } from '../../models/listingType';
import { SortDirection, SortingObject } from '../../models/sortingObject';

@Component({
  selector: 'house-listing',
  templateUrl: './house-listing.component.html',
  styleUrl: './house-listing.component.css'
})
export class HouseListingComponent {
  houseListings: HouseListing[] = [];

  squareMeter: number = 0;
  price: number = 0;
  filterObject: HouseFilter = {
    bathroomCount: null,
    cityId: null,
    districtId: null,
    hasBalcony: null,
    hasElevator: null,
    hasFurniture: null,
    hasGarden: null,
    hasParking: null,
    houseTypeId: null,
    isInGatedCommunity: null,
    listingTypeId: null,
    livingRoomCount: null,
    maxBuildAge: null,
    maxPrice: null,
    minPrice: null,
    maxSquareMeter: null,
    minSquareMeter: null,
    roomCount: null,
    searchText: null,
  };
  filterApiUrl = "https://localhost:44318/api/HouseListings/getallbyfilter"

  city: City[] = [];
  districts: District[] = [];
  houseTypes: HouseType[] = [];
  listingTypes: ListingType[] = [];

  currentPage = 1;
  listingsPerPage = 12;
  selectedSorting: string = "date-1";


  sorting: SortingObject = {
    sortBy: "date",
    sortDirection: SortDirection.Descending
  }
  constructor(
    private houseListingService: HouseListingService,
    private cityService: CityService,
    private districService: DistrictService,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private listingTypeService: ListingTypeService,
    private houseTypeService: HouseTypeService,
  ) { }

  ngOnInit(): void {
    this.getListingByPage(this.currentPage, this.listingsPerPage);
    this.getCity();
    this.getHouseTypes();
    this.getListingTypes();
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });
  }


  getHouseListing() {
    this.houseListingService.getHouseListing().subscribe(response => {
      this.houseListings = response.data;
    })

  }


  getListingByPage(page: number, pageSize: number) {

    this.houseListingService.getPaginatedListings(this.filterObject, this.sorting, this.currentPage, this.listingsPerPage).subscribe(response => {
      this.houseListings = response.data;

    })
  }

  filterHouseListings(filterObject: HouseFilter) {
    this.houseListingService.getByFilter(filterObject).subscribe((response) => {
      this.houseListings = response.data;
      this.toastrService.success("Başarıyla Filtrelendi", "İşlem Başarılı")
    },
      (errorResponse) => {
        this.toastrService.error("Bir hata ile karşılaşıldı", "Hata")
      }
    );
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
    } else if (cityId == undefined) {
      this.districts = [];
    }
    else {
      this.districts = []; // Şehir seçilmediyse ilçe listesini temizle
    }
  }




  getDistrict(ciytyId: number) {
    this.districService.getDistrict(ciytyId).subscribe(respone => {
      this.districts = respone.data;
    })
  }

  getListingTypes() {
    this.listingTypeService.getAll().subscribe(response => {
      this.listingTypes = response.data;
    })
  }
  getHouseTypes() {
    this.houseTypeService.getAll().subscribe(response => {
      this.houseTypes = response.data;
    })
  }
  onSubmit() {
    if (this.filterObject.minSquareMeter && this.filterObject.maxSquareMeter && this.filterObject.minSquareMeter > this.filterObject.maxSquareMeter) {
      this.squareMeter = this.filterObject.minSquareMeter;
      this.filterObject.minSquareMeter = this.filterObject.maxSquareMeter;
      this.filterObject.maxSquareMeter = this.squareMeter;
    }

    if (this.filterObject.minPrice && this.filterObject.maxPrice && this.filterObject.minPrice > this.filterObject.maxPrice) {
      this.price = this.filterObject.minPrice;
      this.filterObject.minPrice = this.filterObject.maxPrice;
      this.filterObject.maxPrice = this.price;
    }


    this.router.navigateByUrl(`/houselisting/page/1`);
    this.currentPage = 1

    this.getListingByPage(this.currentPage, this.listingsPerPage)
  }

  getHouseListingImagePath(houseListing: HouseListing): string {
    if (houseListing.imagePath && houseListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + houseListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
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


  previousPage() {
    if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getListingByPage(this.currentPage, this.listingsPerPage);
      this.router.navigateByUrl(`/houselisting/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }


  nextPage() {
    if (this.houseListings.length < 12) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else {
      this.currentPage = this.currentPage + 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage);

      this.router.navigateByUrl(`/houselisting/page/${this.currentPage}`); // Sadece link kısmını güncelle

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
