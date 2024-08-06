import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { Listing } from '../../models/listing';
import { User } from '../../models/user';
import { ListingImageService } from '../../services/listing-image.service';
import { AuthService } from '../../services/auth.service';
import { UserImageService } from '../../services/user-image.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  listingCount!:number;
  activeListingCount!:number;
  passiveListingCount!:number;

  userCount!:number;
  activeUserCount!:number;
  passiveUserCount!:number;

  latestListings!:Listing[]
  latestUsers!:User[]

  ngOnInit(): void {
    this.getListingCount()
    this.getActiveListingCount();
    this.getPassiveListingCount();
    this.getUserCount();
    this.getActiveUserCount();
    this.getPassiveUserCount();

    let pageSize = 4
    this.getLatestListings(pageSize);
    this.getLatestUsers(pageSize);
  }
  
  constructor(private listingService:ListingService,private userService:UserService,private listingImageService:ListingImageService,private authService:AuthService
    ,private userImageService:UserImageService
  ){

  }

  logout(){
    this.authService.logOut()
    window.location.href = "/";
  }

  getListingCount(){
    this.listingService.getListingCount().subscribe(
      response=>
        this.listingCount = response.data
    )
  }
  getActiveListingCount(){
    this.listingService.getActiveListingCount().subscribe(
      response=>
        this.activeListingCount = response.data
    )
  }
  getPassiveListingCount(){
    this.listingService.getPassiveListingCount().subscribe(
      response=>
        this.passiveListingCount = response.data
    )
  }

  getUserCount(){
    this.userService.getUserCount().subscribe(
      response=>
        this.userCount = response.data
    )
  }
  getActiveUserCount(){
    this.userService.getActiveUserCount().subscribe(
      response=>
        this.activeUserCount = response.data
    )
  }
  getPassiveUserCount(){
    this.userService.getPassiveUserCount().subscribe(
      response=>
        this.passiveUserCount = response.data
    )
  }

  getLatestListings(pageSize:number){
    this.listingService.getPaginatedListings(null,null,1,pageSize).subscribe(
      response=>
        this.latestListings = response.data
    )
  }
  getLatestUsers(pageSize:number){
    this.userService.getLatestUsers(pageSize).subscribe(
      response=>
        this.latestUsers = response.data
    )
  }
  
  getListingImagePath(imagePath: string): string {
    if (imagePath && imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }

  getUserImagePath(user:User):string{
    return 'https://localhost:44318/Uploads/UserImages/' + user.imagePath
  }
}
