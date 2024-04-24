import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddHouseListing } from '../../models/addHouseListing';
import { ListingImageService } from '../../services/listing-image.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { CityService } from '../../services/city.service';
import { DistrictService } from '../../services/district.service';
import { AddLandListing } from '../../models/addLandListing';
import { AddHouseListingResponse } from '../../models/addHouseListingResponse';
import { AddLandListingResponse } from '../../models/addLandListingResponse';
import { HouseListingService } from '../../services/house-listing.service';
import { LandListingService } from '../../services/land-listing.service';
import { ListingTypeService } from '../../services/listing-type.service';
import { HouseTypeService } from '../../services/house-type.service';
import { HouseType } from '../../models/houseType';
import { ListingType } from '../../models/listingType';

@Component({
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit {
  type: string = 'house';
  house: boolean = true;

  addHouseListingResponse!: AddHouseListingResponse;
  addHouseListing: AddHouseListing = {
    cityId: 0,
    listingTypeId: 0,
    propertyTypeId: 1,
    districtId: 0,
    title: '',
    description: '',
    price: 0,
    squareMeter: 0,
    status: true,
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
    images: [],
  };

  addLandListingResponse!: AddLandListingResponse;
  addLandListing: AddLandListing = {
    cityId: 0,
    listingTypeId: 0, // kiralık satılık
    propertyTypeId: 2, //arsa tip belirleme bu
    districtId: 0,
    title: "",
    description: "",
    price: 0,
    squareMeter: 0,
    address: "",
    parcelNo: 0,
    islandNo: 0,
    sheetNo: 0,
    floorEquivalent: true,
    status: true,
    images: [],
  }

  city: City[] = [];
  districts: District[] = [];
  houseTypes:HouseType[] = [];
  listingTypes:ListingType[] = [];

  constructor(private houseListingService:HouseListingService,private landListingService:LandListingService,private listingImageService: ListingImageService, private cityService: CityService, private districService: DistrictService,
    private listingTypeService:ListingTypeService,private houseTypeService:HouseTypeService
  ) { }
  ngOnInit(): void {
    this.getCity();
    this.getHouseTypes();
    this.getListingTypes();
  }

  onTypeChange() {
    // Seçilen tipi işleyecek kod buraya gelecek
    if (this.type === 'house') {
      this.house = true;
    } else if (this.type === 'land') {
      this.house = false;
    }
  }
  getCity() {
    this.cityService.getCity().subscribe(response => {
      this.city = response.data;
    })
  }
  getListingTypes(){
this.listingTypeService.getAll().subscribe(response=>{
  this.listingTypes = response.data;
})
  }
  getHouseTypes(){
    this.houseTypeService.getAll().subscribe(response=>{
      this.houseTypes = response.data;
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


  addHouseListingSubmit() {
    console.log(this.addHouseListing)
    this.houseListingService.addListing(this.addHouseListing)
      .subscribe(
        response => {
          console.log('İlan başarıyla eklendi:', response);
          this.addHouseListingResponse= response.data;
          console.log(this.addHouseListingResponse)
          this.addHouseListing.images.forEach(image => {
            console.log("çalıştı:")
            console.log(image)
            this.listingImageService.uploadImage(this.addHouseListingResponse.listingId, image).subscribe(response => {console.log("Resimler Eklendi")})
          });

        },
        error => {
          console.error('İlan eklenirken bir hata oluştu:', error);
        }
      );
  }

  addLandListingSubmit() {
    this.landListingService.addLandListing(this.addLandListing)
      .subscribe(
        response => {
          console.log('İlan başarıyla eklendi:', response);
          this.addLandListingResponse = response.data;
          console.log(this.addLandListingResponse)
          this.addLandListing.images.forEach(image => {
            console.log("çalıştı:")
            console.log(image)
            this.listingImageService.uploadImage(this.addLandListingResponse.listingId, image).subscribe(response => {console.log("Resimler Eklendi")})
          });

        },
        error => {
          console.error('İlan eklenirken bir hata oluştu:', error);
        }
      );
  }

  onFileSelectedHouse(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addHouseListing.images.push(files[i]);
    }
  }
  onFileSelectedLand(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addLandListing.images.push(files[i]);
    }
  }
}