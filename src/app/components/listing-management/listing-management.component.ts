import { Component } from '@angular/core';
import { ListingFilter } from '../../models/listingFilter';
import { AuthService } from '../../services/auth.service';
import { SortDirection, SortingObject } from '../../models/sortingObject';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingType } from '../../models/listingType';
import { ListingTypeService } from '../../services/listing-type.service';
import { LandListingService } from '../../services/land-listing.service';
import { HouseListingService } from '../../services/house-listing.service';
import { ListingService } from '../../services/listing.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { DistrictService } from '../../services/district.service';
import { CityService } from '../../services/city.service';
import { Listing } from '../../models/listing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-management',
  templateUrl: './listing-management.component.html',
  styleUrl: './listing-management.component.css'
})
export class ListingManagementComponent {
  
  listings:Listing[]=[]

  currentPage = 1;
  listingsPerPage = 10;

  selectedSorting: string = "date-1";
  activeListingId!: number;

  listingCount!:number;
  activeListingCount !:number;
  passiveListingCount !:number;

  listingPageCount!: number;
  activeListingPageCount!: number;
  passiveListingPageCount!: number;

  houseListingCount!:number;
  landListingCount!:number;
  activeHouseListingCount!:number;
  passiveHouseListingCount!:number;
  activeLandListingCount!:number;
  passiveLandListingCount!:number;

  listingTypes: ListingType[] = [];
  city: City[] = [];
  districts: District[] = [];


  filterObject: ListingFilter = {
    cityId: null,
    districtId: null,
    listingTypeId: null,
    maxPrice: null,
    maxSquareMeter: null,
    minPrice: null,
    minSquareMeter: null,
    searchText: null,
    listingStatus: null,
    propertyTypeId: null, // Arsa, ev gibi türler için
    date: null // İlanın eklenme tarihi
}

  sorting: SortingObject = {
    sortBy: "date",
    sortDirection: SortDirection.Descending
  }
propertyTypes: any;
  constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router,
  private listingTypeService: ListingTypeService,
  private listingService:ListingService,
  private houseListingService: HouseListingService,
  private landListingService: LandListingService,
  private cityService: CityService,
  private districService: DistrictService,
  private toastrService: ToastrService,


  ){
    
  }

  ngOnInit(): void {
    this.getCity();
    this.getListingTypes();
    this.updateListingCounts(); // Güncellenmiş yöntem
    this.getHouseListingCount(); // Güncellenmiş yöntem
    this.getLandListingCount(); // Güncellenmiş yöntem

    
    // Sayfa ID'sini al
    let pageId = this.route.snapshot.paramMap.get('pageId');
    if (pageId) {
        this.currentPage = parseInt(pageId, 10);
        
        // Filtre durumunu al
        const filterStatus = this.route.snapshot.paramMap.get('filterStatus');
        console.log("cons " + filterStatus);
        
        if (filterStatus !== null) {
            // 'active' ya da 'inactive' değerlerini boolean'a dönüştür
            this.filterObject.listingStatus = filterStatus === 'active' ? true : filterStatus === 'inactive' ? false : null;
            this.onSubmit(); // Filtreleme işlevini çağır
            console.log("Filtreli listing getirme");
        } else {
            this.getListingByPage(this.currentPage, this.listingsPerPage);
            console.log("Filtresiz listing getirme");
        }
        return;
    } else {
        this.getListingByPage(this.currentPage, this.listingsPerPage);
    }
}



updateListingCounts() {
  this.getListingCount();
  this.getActiveListingCount();
  this.getPassiveListingCount();
}



  getListingByPage(page: number, pageSize: number) {

    this.listingService.getPaginatedListings(this.filterObject, this.sorting, this.currentPage, this.listingsPerPage).subscribe(response => {
      this.listings = response.data;

    })
  }



  getListingTypes() {
    this.listingTypeService.getAll().subscribe(response => {
      this.listingTypes = response.data;
    })
  }

  onSubmit() {
//cityId status ile değişecek
    if (this.filterObject.listingStatus !== null && this.router.url.startsWith("/dashboard/listing-management/status/")) {
      const filterStatus = this.filterObject.listingStatus;
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/.`);
      this.currentPage = 1
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      return
    }
    console.log(this.filterObject)
    this.router.navigateByUrl(`/dashboard/listing-management/page/1`);
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
      listingStatus: null,
      propertyTypeId: null, // Arsa, ev gibi türler için
      date: null // İlanın eklenme tarihi
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


setActiveToListingId(listingId: number) {
  this.activeListingId = listingId;
  console.log("ActiveToUser" + this.setActiveToListingId)
}
activeListing() {
  this.listingService.setListingActive(this.activeListingId).subscribe(response => {
    this.toastrService.info("İlan aktif edildi", "İşlem Başarılı")
    window.location.reload();

  });
}

setInactiveToListingId(listingId: number) {
  this.activeListingId = listingId;
  console.log("InactiveToUser" + this.setInactiveToListingId)
}

inactiveListing() {
  this.listingService.deleteListing(this.activeListingId).subscribe(response => {
    this.toastrService.info("İlan Başarıyla Silindi", "İşlem Başarılı")
    window.location.reload();


  });
}

  getDistrict(cityId: number) {
    if (cityId != null) {
      this.districService.getDistrict(cityId).subscribe(respone => {
        this.districts = respone.data;
      })
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

  //İlan Sayıları
  getHouseListingCount() {
    this.houseListingService.getActiveHouseListingCount().subscribe(response => {
      this.activeHouseListingCount = response.data;
      this.houseListingCount = this.activeHouseListingCount + this.passiveHouseListingCount;
    });
    this.houseListingService.getPassiveHouseListingCount().subscribe(response => {
      this.passiveHouseListingCount = response.data;
    });
  }

  getLandListingCount() {
    this.landListingService.getActiveLandListingCount().subscribe(response => {
      this.activeLandListingCount = response.data;
      this.landListingCount = this.activeLandListingCount + this.passiveLandListingCount;
    });
    this.landListingService.getPassiveLandListingCount().subscribe(response => {
      this.passiveLandListingCount = response.data;
    });
  }

  getListingCount() {
    this.listingService.getListingCount().subscribe(response => {
      this.listingCount = response.data;
    });
  }

  getActiveListingCount() {
    this.listingService.getActiveListingCount().subscribe(response => {
      this.activeListingCount = response.data;
    });
  }

  getPassiveListingCount() {
    this.listingService.getPassiveListingCount().subscribe(response => {
      this.passiveListingCount = response.data;
    });
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

  logout() {
    this.authService.logOut()
    window.location.href = "/";
  }




  previousPage() {
    if (this.filterObject.listingStatus !== null && this.router.url.startsWith("/dashboard/listing-management/status/") && this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      const filterStatus = this.filterObject.listingStatus;
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      return
    }
    else if (this.filterObject.listingStatus !== null && this.router.url.startsWith("/dashboard/listing-management/status/") && this.currentPage != 1) {
      const filterStatus = this.filterObject.listingStatus;
      this.currentPage = this.currentPage - 1;
      this.getListingByPage(this.currentPage, this.listingsPerPage)
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/${this.currentPage}`);
    }
    else if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getListingByPage(this.currentPage, this.listingsPerPage);
      this.router.navigateByUrl(`/dashboard/listing-management/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }

  nextPage() {
    // Max sayfa sayısını duruma göre belirle
    let maxPage = this.getMaxPageBasedOnStatus();
  
    if (this.currentPage >= maxPage || this.listings.length < this.listingsPerPage) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return;
    }
  
    this.currentPage = this.currentPage + 1;
  
    // Status değeri ve URL yapısına göre yönlendirme
    if (this.filterObject.listingStatus !== null && this.router.url.startsWith("/dashboard/listing-management/status/")) {
      const filterStatus = this.filterObject.listingStatus;
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/${this.currentPage}`);
    } else {
      this.router.navigateByUrl(`/dashboard/listing-management/page/${this.currentPage}`);
    }
  
    this.getListingByPage(this.currentPage, this.listingsPerPage);
  }
  
  // Max sayfa sayısını duruma göre hesapla
  getMaxPageBasedOnStatus(): number {
    if (this.filterObject.listingStatus === true) {
      return this.activeListingCount;
    } else if (this.filterObject.listingStatus === false) {
      return this.passiveListingCount;
    } else {
      return this.listingPageCount;
    }
  }
  
  // Sayfa sayısı hesaplamaları
  calculatePageCounts() {
    this.listingPageCount = Math.ceil(this.listingCount / this.listingsPerPage);
    this.activeListingPageCount = Math.ceil(this.activeListingCount / this.listingsPerPage);
    this.passiveListingPageCount = Math.ceil(this.passiveListingCount / this.listingsPerPage);
    console.log('UserPage:', this.listingPageCount);
    console.log('ActiveUserPage:', this.activeListingCount);
    console.log('PassiveUserPage:', this.passiveListingCount);
  }
  
  
  setPageNumber(pageNumber: number) {
    // Max sayfa sayısını duruma göre belirle
    let maxPage = this.getMaxPageBasedOnStatus();
  
    // Girilen sayıyı max sayıya eşitle
    if (pageNumber > maxPage) {
      pageNumber = maxPage;
  
      this.toastrService.warning("Gitmek istediğiniz sayfa yok. Son sayfaya yönlendirildiniz.", "Dikkat");
  
    }
  
    this.currentPage = pageNumber;
  
    if (this.filterObject.listingStatus !== null && this.router.url.startsWith("/dashboard/listing-management/status/")) {
      const filterStatus = this.filterObject.listingStatus;
      this.router.navigateByUrl(`/dashboard/listing-management/status/${filterStatus}/page/${this.currentPage}`);
    } else {
      this.router.navigateByUrl(`/dashboard/listing-management/page/${this.currentPage}`);
    }
  
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
