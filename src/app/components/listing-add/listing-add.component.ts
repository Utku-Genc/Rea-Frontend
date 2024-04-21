import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddHouseListing } from '../../models/addHouseListing';
import { AddHouseService } from '../../services/add-house.service';
import { AddListingImageService } from '../../services/add-listing-image.service';
import { City } from '../../models/city';
import { District } from '../../models/district';
import { CityService } from '../../services/city.service';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css']
})
export class ListingAddComponent implements OnInit{
  type: string = 'house';
  house: boolean = true;


  addListing: AddHouseListing = {
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

  
  city: City[] = [];
  districts: District[] = [];

  constructor(private addHouseService: AddHouseService, private addListingImageService: AddListingImageService,private cityService: CityService, private districService: DistrictService,) {}
  ngOnInit(): void {
    this.getCity();
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

  addListingSubmit() {
console.log(this.addListing)
    this.addHouseService.addListing(this.addListing)
      .subscribe(
        response => {
          console.log('İlan başarıyla eklendi:', response);
        //   const listingId = response.data.listingId; // Örneğin bu şekilde listingId'yi aldığınızı varsayalım
        //   this.addHouseService.addImages(listingId, this.addListing.images)
        //     .subscribe(
        //       () => {
        //         console.log('Fotoğraflar başarıyla eklendi.');
        //       },
        //       error => {
        //         console.error('Fotoğraflar eklenirken bir hata oluştu:', error);
        //       }
        //     );
       },
        error => {
          console.error('İlan eklenirken bir hata oluştu:', error);
        }
      );
  }

  onFileSelected(event: any) {
    // Seçilen dosyaları işleyecek kod buraya gelecek
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addListing.images.push(files[i]);
    }
  }
}