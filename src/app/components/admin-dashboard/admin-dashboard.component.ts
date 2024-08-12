import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { Listing } from '../../models/listing';
import { User } from '../../models/user';
import { ListingImageService } from '../../services/listing-image.service';
import { AuthService } from '../../services/auth.service';
import { UserImageService } from '../../services/user-image.service';
import { catchError, map, Observable, of } from 'rxjs';
import { HouseListingService } from '../../services/house-listing.service';
import { LandListingService } from '../../services/land-listing.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  listingCount!:number;
  activeListingCount!:number;
  passiveListingCount!:number;

  houseListingCount!:number;
  activeHouseListingCount!:number;
  passiveHouseListingCount!:number;

  landListingCount!:number;
  activeLandListingCount!:number;
  passiveLandListingCount!:number;
  
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
    this.getActiveHouseListingCount();
    this.getPassiveHouseListingCount();
    this.getActiveLandListingCount();
    this.getPassiveLandListingCount();

    let pageSize = 8
    this.getLatestListings(pageSize);
    this.getLatestUsers(pageSize);
  }
  
  constructor(private listingService:ListingService,
    private userService:UserService,
    private listingImageService:ListingImageService,
    private authService:AuthService,
    private userImageService:UserImageService,
    private houseListingService: HouseListingService,
    private landListingService: LandListingService,

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
  getActiveHouseListingCount(){
    this.houseListingService.getActiveHouseListingCount().subscribe(
      response=>
        this.activeHouseListingCount = response.data
    )
  }
  getPassiveHouseListingCount(){
    this.houseListingService.getPassiveHouseListingCount().subscribe(
      response=>
        this.passiveHouseListingCount = response.data
    )
  }

  getActiveLandListingCount(){
    this.landListingService.getActiveLandListingCount().subscribe(
      response=>
        this.activeLandListingCount = response.data
    )
  }
  getPassiveLandListingCount(){
    this.landListingService.getPassiveLandListingCount().subscribe(
      response=>
        this.passiveLandListingCount = response.data
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
