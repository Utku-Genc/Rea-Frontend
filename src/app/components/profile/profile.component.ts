import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ListResponseModel } from '../../models/listResponseModel';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  listings: Listing[] = [];
  user!: User ;
  userImg : UserImage[] = [];

  constructor(private listingService:ListingService, private userService:UserService,private userImageService:UserImageService,) {};

  ngOnInit(): void {
    this.getListingByUserId();
    this.getUserByToken();
    this.getUserImageByToken();

  }
  getListingByUserId() {
    this.listingService.getListingByUserId().subscribe(response => {
      this.listings = response.data;
    
    })
  }
  
  getUserByToken() {
    this.userService.getUserByToken().subscribe(response => {
      this.user = response.data;
    })
  }
  getUserImageByToken() {
    this.userImageService.getUserImageByToken().subscribe(response => {
      this.userImg = response.data;
    })
  }
  

  getUserImagePath(userImage: UserImage): string {
    if (userImage.imagePath && this.userImg.length>0) {
      return 'https://localhost:44318/Uploads/UserImages/' + userImage.imagePath;
    } else {
      // Default User resim yolu
      return 'https://localhost:44318/Uploads/UserImages/DefaultUserImage.png';
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
}
