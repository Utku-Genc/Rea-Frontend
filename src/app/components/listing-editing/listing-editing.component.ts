import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserImageService } from '../../services/user-image.service';
import { LandListingService } from '../../services/land-listing.service';
import { UserImage } from '../../models/userImage';
import { HouseDetail } from '../../models/houseDetail';
import { LandDetail } from '../../models/landDetail';
import { ListingImage } from '../../models/listingImage';
import { ListingTypeService } from '../../services/listing-type.service';
import { HouseTypeService } from '../../services/house-type.service';
import { HouseType } from '../../models/houseType';
import { ListingType } from '../../models/listingType';
import { CityService } from '../../services/city.service';
import { DistrictService } from '../../services/district.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { HouseListingService } from '../../services/house-listing.service';
import { UpdateHouse } from '../../models/updateHouse';
import { UpdateLand } from '../../models/updateLand';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { ListResponseModel } from '../../models/listResponseModel';

@Component({
  selector: 'listing-editing',
  templateUrl: './listing-editing.component.html',
  styleUrl: './listing-editing.component.css'
})
export class ListingEditingComponent implements OnInit {
    @ViewChild('imageContainer') imageContainer!: ElementRef;
    imageListing!: ListResponseModel<ListingImage>;
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
    apiUrlImg = "https://localhost:44318/api/ListingImages/getbylistingid?listingId=";
  
    updateHouseListing: UpdateHouse = {
      userId:0,
      cityId: 0,
      listingTypeId:0,
      propertyTypeId: 1,
      districtId: 0,
      title: '',
      description: '',
      price: 0,
      squareMeter: 0,
      typeId: 0,
      roomCount: 0,
      bathroomCount: 0,
      livingRoomCount: 0,
      floorCount: 0,
      currentFloor: 0,
      hasGarden: false,
      hasBalcony: false,
      hasElevator: false,
      hasParking: false,
      hasFurniture: false,
      isInGatedCommunity: false,
      buildingAge: 0,
      address: '',
      houseListingId: 0,
      status: true
    };

    updateLandListing: UpdateLand = {
      userId:0,
      cityId: 0,
      listingTypeId: 0,
      propertyTypeId: 1,
      districtId: 0,
      title: '',
      description: '',
      price: 0,
      squareMeter: 0,
      status: true,
      id: 0,
      address: '',
      parcelNo: 0,
      islandNo: 0,
      sheetNo: 0,
      floorEquivalent: false
    }

    constructor(private httpClient: HttpClient,
      private route: ActivatedRoute,
      private userImageService: UserImageService,
      private houseListingService: HouseListingService,
      private landListingService: LandListingService,
      private listingTypeService: ListingTypeService,
      private houseTypeService: HouseTypeService,
      private cityService: CityService,
      private districService: DistrictService,
      private toastrService:ToastrService,
      private router:Router
    ) { }
  
    ngOnInit() {
      const listingId = this.route.snapshot.paramMap.get('id');
      if (listingId != null) {
        if (listingId.startsWith("1")) {
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
      this.httpClient.get<ListResponseModel<ListingImage>>(this.apiUrlImg + listingId).subscribe((response) => {
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
  
    getHouseDetail(listingId: string) {
     this.houseListingService.getHouseDetail(listingId)
      .subscribe((response) => {
        this.houseDetail = response.data;
        this.getUserImageByUserId(this.houseDetail.userId);

        this.updateHouseListing.houseListingId = response.data.id;
        this.updateHouseListing.title = response.data.title;
        this.updateHouseListing.description = response.data.description;
        this.updateHouseListing.price = response.data.price;
        this.updateHouseListing.address = response.data.address;
        this.updateHouseListing.roomCount= response.data.roomCount;
        this.updateHouseListing.livingRoomCount= response.data.livingRoomCount;
        this.updateHouseListing.bathroomCount= response.data.bathroomCount;
        this.updateHouseListing.squareMeter= response.data.squareMeter;
        this.updateHouseListing.floorCount= response.data.floorCount;
        this.updateHouseListing.currentFloor= response.data.currentFloor;
        this.updateHouseListing.buildingAge= response.data.buildingAge;
        this.updateHouseListing.hasGarden= response.data.hasGarden;
        this.updateHouseListing.hasParking= response.data.hasParking;
        this.updateHouseListing.hasBalcony= response.data.hasBalcony;
        this.updateHouseListing.hasFurniture= response.data.hasFurniture;
        this.updateHouseListing.hasElevator= response.data.hasElevator;
        this.updateHouseListing.isInGatedCommunity= response.data.isInGatedCommunity;
        this.updateHouseListing.userId = response.data.userId;
      });
  }

  updateHouse(){
    let hasError = false;
    if(this.updateHouseListing.cityId == 0){
      this.toastrService.error("Şehir Bilgisi Boş Olamaz", "Dikkat!");
      hasError = true;
    }
    if(this.updateHouseListing.districtId == 0){
      this.toastrService.error("İlçe Bilgisi Boş Olamaz", "Dikkat!");
      hasError = true;

    }
    if(this.updateHouseListing.typeId == 0){
      this.toastrService.error("Ev Tipi Boş Olamaz", "Dikkat!");
      hasError = true;

    }
    if(this.updateHouseListing.listingTypeId == 0){
      this.toastrService.error("İlan Tipi Bilgisi Boş Olamaz", "Dikkat!");
      hasError = true;

    }
    if(hasError == true)return      
    
    this.houseListingService.updateHouse(this.updateHouseListing).subscribe(response =>{
        this.router.navigate(["profile/ilanlarim"]);
        this.toastrService.success("İlan Başarıyla Güncellendi", "İşlem Başarılı")
      })
  
    }

  getLandListingDetail(listingId: string) {
    this.landListingService.getLandListingDetail(listingId).subscribe(response => {
      this.landDetail = response.data;
      this.getUserImageByUserId(this.landDetail.userId);

      this.updateLandListing.id = response.data.id;
      this.updateLandListing.title = response.data.title;
      this.updateLandListing.description = response.data.description;
      this.updateLandListing.price = response.data.price;
      this.updateLandListing.address = response.data.address;
      this.updateLandListing.parcelNo = response.data.parcelNo;
      this.updateLandListing.islandNo = response.data.islandNo;
      this.updateLandListing.sheetNo = response.data.sheetNo;
      this.updateLandListing.floorEquivalent = response.data.floorEquivalent;
      this.updateLandListing.squareMeter = response.data.squareMeter;
      this.updateLandListing.userId = response.data.userId

      console.log(this.updateLandListing)




    })
  }

  updateLand(){
    let hasError = false;
    if(this.updateLandListing.cityId == 0){
      this.toastrService.error("Şehir Bilgisi Boş Olamaz", "Dikkat!");
      hasError = true;
    }
    if(this.updateLandListing.districtId == 0){
      this.toastrService.error("İlçe Bilgisi Boş Olamaz", "Dikkat!");
      hasError = true;

    }
    if(this.updateLandListing.listingTypeId == 0){
      this.toastrService.error("İlan Tipi Boş Olamaz", "Dikkat!");
      hasError = true;

    }
    if(hasError == true)return

    this.landListingService.updateLand(this.updateLandListing).subscribe(response =>{
        this.router.navigate(["profile/ilanlarim"]);
        this.toastrService.success("İlan Başarıyla Güncellendi", "İşlem Başarılı")
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
