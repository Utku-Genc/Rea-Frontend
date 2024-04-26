import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserImageService } from '../../services/user-image.service';
import { LandListingService } from '../../services/land-listing.service';
import { ListingImageResponseModel } from '../../models/listingImageResponseModel';
import { UserImage } from '../../models/userImage';
import { HouseDetail } from '../../models/houseDetail';
import { LandDetail } from '../../models/landDetail';
import { HouseDetailResponseModel } from '../../models/HouseDetailResponseModel';
import { ListingImage } from '../../models/listingImage';
import { ListingTypeService } from '../../services/listing-type.service';
import { HouseTypeService } from '../../services/house-type.service';
import { HouseType } from '../../models/houseType';
import { ListingType } from '../../models/listingType';
import { CityService } from '../../services/city.service';
import { DistrictService } from '../../services/district.service';
import { City } from '../../models/city';
import { District } from '../../models/district';

@Component({
  selector: 'listing-editing',
  templateUrl: './listing-editing.component.html',
  styleUrl: './listing-editing.component.css'
})
export class ListingEditingComponent implements OnInit {
    @ViewChild('imageContainer') imageContainer!: ElementRef;
    imageListing!: ListingImageResponseModel;
    startIndex = 0;
    endIndex = 5;
    visibleImages: string[] = [];
    userImg: UserImage[] = [];

    houseTypes: HouseType[] = [];
    listingTypes: ListingType[] = [];
    city: City[]= [];
    districts: District[]=[];

    houseDetail!: HouseDetail;
    landDetail!: LandDetail;
    apiUrl = "https://localhost:44318/api/HouseListings/getdetails?listingId=";
    apiUrlImg = "https://localhost:44318/api/ListingImages/getbylistingid?listingId=";
  
    constructor(private httpClient: HttpClient,
      private route: ActivatedRoute,
      private userImageService: UserImageService,
      private landListingService: LandListingService,
      private listingTypeService: ListingTypeService,
      private houseTypeService: HouseTypeService,
      private cityService: CityService,
      private districService: DistrictService,
    ) { }
  
    ngOnInit() {
      const listingId = this.route.snapshot.paramMap.get('id');
      if (listingId != null) {
        if (parseInt(listingId, 10) < 20000000) {
          this.getHouseDetail(listingId);
        } else {
          this.getLandListingDetail(listingId);
        }
      }
      this.getCity();
      this.getHouseTypes();
      this.getListingTypes();
      this.getImage(listingId);
      this.showImages();

    }
  
    getImage(listingId: string | null) {
      if (!listingId) return;
      this.httpClient.get<ListingImageResponseModel>(this.apiUrlImg + listingId).subscribe((response) => {
        this.imageListing = response;
      })
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
  
  
  
    getDistrict(cityId: number) {
      this.districService.getDistrict(cityId).subscribe(respone => {
        this.districts = respone.data;
      })
    }
  
    getHouseDetail(listingId: string | null) {
      this.httpClient.get<HouseDetailResponseModel>(this.apiUrl + listingId)
      .subscribe((response) => {
        this.houseDetail = response.data;
        this.getUserImageByUserId(this.houseDetail.userId);

      });
  }

  getLandListingDetail(listingId: string) {
    this.landListingService.getLandListingDetail(listingId).subscribe(response => {
      this.landDetail = response.data;
      this.getUserImageByUserId(this.landDetail.userId);

    })
  }

  next() {
    if (this.endIndex < this.imageListing.data.length) {
      this.startIndex += 5;
      this.endIndex += 5;
      this.showImages();
    }
  }

  previous() {
    if (this.startIndex > 0) {
      this.startIndex -= 5;
      this.endIndex -= 5;
      this.showImages();
    }
  }

  showImages() {
    this.visibleImages = this.imageListing.data
      .slice(this.startIndex, this.endIndex)
      .map(listingImage => listingImage.imagePath);
    this.imageContainer.nativeElement.scrollLeft = 0;
  }

  showImageInCarousel(index: number) {
    const carousel = document.getElementById('carouselExampleRide');
    const carouselItems = carousel?.querySelectorAll('.carousel-item');
    if (carouselItems && index >= 0 && index < carouselItems.length) {
      carouselItems.forEach((element, i) => {
        element.classList.remove('active');
        if (i === index) {
          element.classList.add('active');
        }
      });
    }
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
  getUserImageByUserId(id:number) {
    this.userImageService.getUserImageByUserId(id).subscribe(response => {
      this.userImg = response.data
    })
  }

  getUserImagePath(userImage: UserImage): string {
    if (userImage.imagePath && this.userImg.length > 0) {
      return 'https://localhost:44318/Uploads/UserImages/' + userImage.imagePath;
    } else {
      return 'https://localhost:44318/Uploads/UserImages/DefaultUserImage.png';
    }
  }

  getHouseListingImagePath(item: ListingImage): string {
    if (item.imagePath && item.imagePath.length > 0 && this.imageListing.data.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + item.imagePath;
    } else {
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }
}