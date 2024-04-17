import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute ekleyin
import { HouseDetail } from '../../models/houseDetail';
import { HouseDetailResponseModel } from '../../models/HouseDetailResponseModel';
import { HttpClient } from '@angular/common/http';
import { ListingImage } from '../../models/listingImage';
import { ListingImageResponseModel } from '../../models/listingImageResponseModel';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  imageListing!: ListingImageResponseModel; // Resimler buraya atanacak
  startIndex = 0;
  endIndex = 5;
  visibleImages: string[] = [];


  houseDetail!: HouseDetail;
  apiUrl = "https://localhost:44318/api/HouseListings/getdetails?listingId=";
  apiUrlImg = "https://localhost:44318/api/ListingImages/getbylistingid?listingId="

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { } // ActivatedRoute ekleyin

  ngOnInit() {
    const listingId = this.route.snapshot.paramMap.get('id'); // URL'den listingId'yi al
    this.getHouseDetail(listingId); // Parametre olarak listingId'yi geçir
    this.gethouseImage(listingId);
    this.showImages();

  }

  gethouseImage(listingId: string | null ){
     if (!listingId) return;
     this.httpClient.get<ListingImageResponseModel>(this.apiUrlImg+listingId).subscribe((response)=> {
      this.imageListing = response;
      console.log(response);
     })
  }
  getHouseDetail(listingId: string | null) { // listingId parametresini ekleyin
    // listingId yoksa işlem yapma
    if (!listingId) return;

    this.httpClient.get<HouseDetailResponseModel>(this.apiUrl+listingId) // listingId'ye göre ilanı getir
      .subscribe((response) => {
        this.houseDetail = response.data;
      });
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

  getHouseListingImagePath(item: ListingImage): string {
    if (item.imagePath && item.imagePath.length > 0 && this.imageListing.data.length>0 )   {
      console.log('https://localhost:44318/Uploads/ListingImages/' + item.imagePath)
      return 'https://localhost:44318/Uploads/ListingImages/' + item.imagePath;
    } else {
      // Default resim yolu
      console.log("test")
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }
}
