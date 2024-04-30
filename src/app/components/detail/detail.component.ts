import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { HouseDetail } from '../../models/houseDetail';
import { ListingImage } from '../../models/listingImage';
import { UserImageService } from '../../services/user-image.service';
import { UserImage } from '../../models/userImage';
import { LandListingService } from '../../services/land-listing.service';
import { LandDetail } from '../../models/landDetail';
import { HouseListingService } from '../../services/house-listing.service';
import { ListResponseModel } from '../../models/listResponseModel';
import { ListingImageService } from '../../services/listing-image.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  imageListing!: ListResponseModel<ListingImage>;
  startIndex = 0;
  endIndex = 5;
  visibleImages: string[] = [];
  userImg: UserImage[] = [];


  houseDetail!: HouseDetail;
  landDetail!: LandDetail;

  constructor(
    private route: ActivatedRoute,
    private userImageService: UserImageService,
    private landListingService: LandListingService,
    private houseListingService: HouseListingService,
    private listingImageService: ListingImageService,
  ) { } 
  ngOnInit() {
    const listingId = this.route.snapshot.paramMap.get('id'); // URL'den listingId'yi al
    if (listingId != null) {
      console.log(listingId)
      if (listingId.startsWith("1")) {
        this.getHouseDetail(listingId); // Parametre olarak listingId'yi geçir
      } else {
        this.getLandListingDetail(listingId);
      }
    }
    this.getImage(listingId);
    this.showImages();
  }

  getImage(listingId: string | null) {
    if (!listingId) return;
    this.listingImageService.getImage(listingId).subscribe((response) => {
      this.imageListing = response;
      console.log(response);
    })
  }
  getHouseDetail(listingId: string) {
    this.houseListingService.getHouseDetail(listingId)
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

  getUserImageByUserId(id: number) {
    this.userImageService.getUserImageByUserId(id).subscribe(response => {
      this.userImg = response.data
    })
  }

  getUserImagePath(userImage: UserImage): string {
    if (userImage.imagePath && this.userImg.length > 0) {
      return 'https://localhost:44318/Uploads/UserImages/' + userImage.imagePath;
    } else {
      // Default User resim yolu

      return 'https://localhost:44318/Uploads/UserImages/DefaultUserImage.png';
    }
  }

  getHouseListingImagePath(item: ListingImage): string {
    if (item.imagePath && item.imagePath.length > 0 && this.imageListing.data.length > 0) {
      console.log('https://localhost:44318/Uploads/ListingImages/' + item.imagePath)
      return 'https://localhost:44318/Uploads/ListingImages/' + item.imagePath;
    } else {
      // Default resim yolu
      console.log("test")
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }

  getUserId():number{
    if(this.houseDetail == null){
      return this.landDetail.userId
    }
      return this.houseDetail.userId
  }
}

