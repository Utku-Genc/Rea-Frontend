import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing';
import { ListResponseModel } from '../../models/listResponseModel';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  listings: Listing[] = [];
  user!: User ;
  userImg : UserImage[] = [];
  currentPage = 1; 
  listingsPerPage = 12; 

  deleteToListingId! : number

  constructor(private listingService:ListingService, private userService:UserService,private userImageService:UserImageService,private router: Router, private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.getListingByUserId();
    this.getUserByToken();
    this.getUserImageByToken();
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });

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

  
  get startIndex(): number {
    return (this.currentPage - 1) * this.listingsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.listingsPerPage;
  }
  
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log(this.currentPage)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  setDeleteToListingId(listingId:number){
      this.deleteToListingId = listingId;
  }
  deleteListing(){
    this.listingService.deleteListing(this.deleteToListingId).subscribe(response=>{
      console.log(response)
      window.location.reload();
    });
  }

  
  get totalPages(): number {
    return Math.ceil(this.listings.length / this.listingsPerPage);
  }
  
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  get visiblePages(): number[] {
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(start + 3, this.totalPagesArray.length);

    return Array(end - start + 1).fill(0).map((_, index) => start + index);
}
}
