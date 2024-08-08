import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Listing } from '../../models/listing';
import { ListResponseModel } from '../../models/listResponseModel';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  listings: Listing[] = [];
  user!: User;
  userImg: UserImage[] = [];
  currentPage = 1;
  listingsPerPage = 12;

  selectedImage: File | undefined;
  deleteToListingId!: number;

 
  userId:number | undefined
  
  isUsersProfile = this.router.url.startsWith("/profile/ilanlarim");
  constructor(
    private listingService: ListingService,
    private userService: UserService,
    private userImageService: UserImageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService) { };

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.updateProfileView();
    });
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });

  }
  updateProfileView() {
    this.isUsersProfile = this.router.url.startsWith("/profile/ilanlarim");
    if (this.isUsersProfile) {
      this.getListingByToken();
      this.getUserByToken();
      this.getUserImageByToken();
    } else {
      this.userId = Number(this.route.snapshot.paramMap.get('id')?.toString());
      this.getListingByUserId();
      this.getUserById();
      this.getUserImageById();
    }
  }


  getListingByUserId(){
    if(this.userId){
  this.listingService.getListingByUserId(this.userId).subscribe(response=>{
    this.listings = response.data
  })}
  }

  getListingByToken() {
    this.listingService.getByToken().subscribe(response => {
      this.listings = response.data;

    })
  }

  getUserById(){
    if(this.userId){
    this.userService.getUserById(this.userId).subscribe(response=>{
      this.user = response.data
    })
  }
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
  getUserImageById(){
    if(this.userId){
      this.userImageService.getUserImageByUserId(this.userId).subscribe(response=>{
        this.userImg = response.data;
      })
    }

  }


  getUserImagePath(userImage: UserImage): string {
    if (userImage.imagePath && this.userImg.length > 0) {
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

  setDeleteToListingId(listingId: number) {
    this.deleteToListingId = listingId;
    console.log("deleteToListing"+this.setDeleteToListingId)
  }
  
  deleteListing() {
    this.listingService.deleteListing(this.deleteToListingId).subscribe(response => {
      this.toastrService.info("İlan Başarıyla Silindi", "İşlem Başarılı")
      window.location.reload();
    });
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log("onfile")
  }


  addUserImageByToken() {
    if (this.selectedImage) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedImage, this.selectedImage.name);

      // Resim yükleme servisine gönder
      this.userImageService.addUserImageByToken(formData).subscribe(response => {
        // Yükleme başarılıysa sayfayı yenile
        this.toastrService.success("Profil Resmi Başarıyla Eklendi", "Profil")
        window.location.reload();
      }, error => {
        this.toastrService.error("Bir hatayla karşıldı", "Hata")
        console.error('Resim yükleme hatası:', error);
      });
    }
  }

  deleteUserImage() {
    this.userImageService.deleteUserImage().subscribe(response => {
      this.toastrService.success("Profil resmin başarıyla silindi", "Profil")
      console.log(response);
      window.location.reload();

    })
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
