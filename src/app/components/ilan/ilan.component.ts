import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { HttpClient } from '@angular/common/http';
import { ListingService } from '../../services/listing.service';
import { DistrictService} from '../../services/district.service';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
import { District } from '../../models/district';

@Component({
  selector: 'ilan',
  templateUrl: './ilan.component.html',
  styleUrl: './ilan.component.css'
})
export class IlanComponent implements OnInit {

  listings: Listing[] = [];

  filternumber: number[]=[1,2,3,4,5,6,7,8,9];
  filterObject: any = {};
  filterApiUrl = "https://localhost:44318/api/Listings/getallbyfilter"

  city: City[] = [];
  districts: District[] = [];


constructor(private listingService:ListingService,private httpClient: HttpClient, private cityService: CityService, private districService: DistrictService,){}

  ngOnInit(): void {
    this.getListing()
    this.getCity()
  }
  getListing = () => {
      this.listingService.getListing().subscribe((response) => {
        this.listings = response.data;
      });
  }

  onSubmit() {
    // Form verilerini API'ye gönder
    this.httpClient.post<any>(this.filterApiUrl, this.filterObject)
      .subscribe(response => {
        this.listings = response.data
        console.log(response);
        // Burada alınan verileri kullanabilirsin, örneğin bir liste gösterebilirsin.
      }, error => {
        console.error('API iletişim hatası:', error);
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
}
