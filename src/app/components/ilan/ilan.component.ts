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
import { ListingFilter } from '../../models/listingFilter';
import { SortDirection, SortingObject } from '../../models/sortingObject';

@Component({
  selector: 'ilan',
  templateUrl: './ilan.component.html',
  styleUrl: './ilan.component.css'
})
export class IlanComponent implements OnInit {

  listings: Listing[] = [];

  squareMeter: number = 0;
  price: number = 0;
  filterObject: ListingFilter = {
    cityId: null,
    districtId: null,
    listingTypeId: null,
    maxPrice: null,
    maxSquareMeter: null,
    minPrice: null,
    minSquareMeter: null,
    searchText: null,
    listingStatus:true
  }

  sorting: SortingObject = {
    sortBy: "date",
    sortDirection: SortDirection.Descending
  }

  city: City[] = [];
  districts: District[] = [];
  listingTypes: ListingType[] = [];

  currentPage: number = 1;
  listingsPerPage: number = 21;
  selectedSorting: string = "date-1";


  constructor(
    private listingService: ListingService,
    private cityService: CityService,
    private districService: DistrictService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private listingTypeService: ListingTypeService,

  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('pageId');
    if (id) {
      this.currentPage = parseInt(id, 10);
      this.getListingByPage(this.currentPage, this.listingsPerPage);

      const searchText = this.route.snapshot.paramMap.get('searchText');
      console.log("cons" + searchText)
      if (searchText !== null) {
        this.filterObject.searchText = searchText;
        this.onSubmit();
        console.log("2")
      } else {
        this.getListingByPage(this.currentPage, this.listingsPerPage);
        console.log("3")
      }
      this.getCity();
      this.getListingTypes();
      return;
    }

    this.getCity();
    this.getListingTypes();

  }

  getListingByPage(page: number, pageSize: number) {

    this.listingService.getPaginatedListings(this.filterObject, this.sorting, this.currentPage, this.listingsPerPage).subscribe(response => {
      this.listings = response.data;

    })
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



    if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/")) {
      const searchText = this.filterObject.searchText;
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/.`);
      this.currentPage = 1
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      return
    }

    console.log(this.filterObject)
    this.router.navigateByUrl(`/listing/page/1`);
    this.currentPage = 1

    this.getListingByPage(this.currentPage, this.listingsPerPage)
  }

  reset() {
    this.sorting = {
      sortBy: "date",
      sortDirection: SortDirection.Descending
    }
    this.selectedSorting = "date-1";
    this.filterObject = {
      cityId: null,
      districtId: null,
      listingTypeId: null,
      maxPrice: null,
      maxSquareMeter: null,
      minPrice: null,
      minSquareMeter: null,
      searchText: null,
      listingStatus: true
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
    } else if (cityId == undefined) {
      this.districts = [];
    }
    else {
      this.districts = []; // Şehir seçilmediyse ilçe listesini temizle
    }
  }




  getDistrict(cityId: number) {
    if (cityId != null) {
      this.districService.getDistrict(cityId).subscribe(respone => {
        this.districts = respone.data;
      })
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


  getListingImagePath(listing: Listing): string {
    if (listing.imagePath) {
      return 'https://localhost:44318/Uploads/ListingImages/' + listing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }


  previousPage() {
    if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/") && this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      const searchText = this.filterObject.searchText;
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      return
    } else if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/") && this.currentPage != 1) {
      const searchText = this.filterObject.searchText;
      this.currentPage = this.currentPage - 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage);
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`)
    }
    else if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getListingByPage(this.currentPage, this.listingsPerPage);
      this.router.navigateByUrl(`/listing/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }


  nextPage() {
    if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/") && this.listings.length < 12) {
      const searchText = this.filterObject.searchText;
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/") && this.listings.length >= 12) {
      const searchText = this.filterObject.searchText;
      this.currentPage = this.currentPage + 1;
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
    }
    else if (this.listings.length < this.listingsPerPage) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else {
      this.currentPage = this.currentPage + 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage);

      this.router.navigateByUrl(`/listing/page/${this.currentPage}`); // Sadece link kısmını güncelle

    }
  }

  setPageNumber(pageNumber: number) {

    if (this.filterObject.searchText !== null && this.router.url.startsWith("/listing/searchText/") && this.listings.length < 12) {
      const searchText = this.filterObject.searchText;
      this.currentPage = pageNumber;
      this.router.navigateByUrl(`/listing/searchText/${searchText}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      return
    }
    this.currentPage = pageNumber;
    this.router.navigateByUrl(`/listing/page/${this.currentPage}`);
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
