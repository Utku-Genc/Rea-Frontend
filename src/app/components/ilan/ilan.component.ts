import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { HttpClient } from '@angular/common/http';
import { ListingService } from '../../services/listing.service';
import { DistrictService } from '../../services/district.service';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListingType } from '../../models/listingType';
import { ListingTypeService } from '../../services/listing-type.service';

@Component({
  selector: 'ilan',
  templateUrl: './ilan.component.html',
  styleUrl: './ilan.component.css'
})
export class IlanComponent implements OnInit {

  listings: Listing[] = [];

  squareMeter: number = 0;
  price: number = 0;
  filterObject: any = {};

  city: City[] = [];
  districts: District[] = [];
  listingTypes: ListingType[] = [];

  currentPage = 1;
  listingsPerPage = 12;

  constructor(private listingService: ListingService,
    private httpClient: HttpClient,
    private cityService: CityService,
    private districService: DistrictService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private listingTypeService: ListingTypeService,

  ) { }

  ngOnInit(): void {
    const searchText = this.route.snapshot.paramMap.get('searchText');
    if (searchText !== null) {
      this.filterObject.searchText = searchText;
      this.onSubmit();
    } else {
      this.getListing();
    }

    this.getCity();
    this.getListingTypes();
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });
  }
  getListing = () => {
    this.listingService.getListing().subscribe((response) => {
      this.listings = response.data;
    });
  }
  getListingTypes() {
    this.listingTypeService.getAll().subscribe(response => {
      this.listingTypes = response.data;
    })
  }

  onSubmit() {

    if (this.filterObject.minSquareMeter > this.filterObject.maxSquareMeter) {
      this.squareMeter = this.filterObject.minSquareMeter;
      this.filterObject.minSquareMeter = this.filterObject.maxSquareMeter;
      this.filterObject.maxSquareMeter = this.squareMeter;
    }

    if (this.filterObject.minPrice > this.filterObject.maxPrice) {
      this.price = this.filterObject.minPrice;
      this.filterObject.minPrice = this.filterObject.maxPrice;
      this.filterObject.maxPrice = this.price;
    }



    if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/")) {
      const searchText = this.filterObject.searchText;
      this.router.navigateByUrl(`/listing/searchText/${searchText}`); // Sadece link kısmını güncelle
    }




    this.listingService.getByFilter(this.filterObject)
      .subscribe(response => {
        this.listings = response.data
        this.toastrService.success("Başarıyla Filtrelendi", "İşlem Başarılı")
      }, error => {
        this.toastrService.error("Bir hatayla karşılaşıldı", "Hata");
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
  getListingImagePath(listing: Listing): string {
    if (listing.imagePath) {
      return 'https://localhost:44318/Uploads/ListingImages/' + listing.imagePath;
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
    return Math.ceil(this.listings.length / this.listingsPerPage);
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
