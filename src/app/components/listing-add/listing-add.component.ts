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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    floorEquivalent: false,
    status: true,
    images: [],
  }

  city: City[] = [];
  districts: District[] = [];
  houseTypes: HouseType[] = [];
  listingTypes: ListingType[] = [];

  constructor(
    private houseListingService: HouseListingService,
    private landListingService: LandListingService,
    private listingImageService: ListingImageService,
    private cityService: CityService,
    private districService: DistrictService,
    private listingTypeService: ListingTypeService,
    private houseTypeService: HouseTypeService,
    private router: Router,
    private toastrService: ToastrService
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
          this.toastrService.success("İlan Başarıyla eklendi", response.data.listingId.toString())
          this.addHouseListingResponse = response.data;
          this.addHouseListing.images.forEach(image => {
            this.listingImageService.uploadImage(this.addHouseListingResponse.listingId, image).subscribe(response => {
              this.toastrService.success("Resimler Eklendi");
              this.router.navigate(["profile/ilanlarim"]);

            })
          });
          this.router.navigate(["profile/ilanlarim"]);

        },
        responseError => {
          if (responseError.error.ValidationErrors.length > 0) {
            console.log(responseError.error.ValidationErrors)
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
            }
          }
        }
      );
  }

  addLandListingSubmit() {
    this.landListingService.addLandListing(this.addLandListing)
      .subscribe(
        response => {
          this.toastrService.success("İlan Başarıyla eklendi", response.data.listingId.toString())
          this.addLandListingResponse = response.data;
          this.addLandListing.images.forEach(image => {
            this.listingImageService.uploadImage(this.addLandListingResponse.listingId, image).subscribe(response => { console.log("Resimler Eklendi") })
            this.router.navigate(["profile/ilanlarim"]);

          });
          this.router.navigate(["profile/ilanlarim"]);
        },
        responseError => {
          if (responseError.error.ValidationErrors.length > 0) {
            console.log(responseError.error.ValidationErrors)
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
            }
          }
        }
      );
  }

  onFileSelectedHouse(event: any) {
    this.addHouseListing.images = [];

    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addHouseListing.images.push(files[i]);
    }
  }
  onFileSelectedLand(event: any) {
    this.addLandListing.images = [];

    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addLandListing.images.push(files[i]);
    }
  }
}