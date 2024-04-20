import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; 
  userImg: UserImage[] = [];

  constructor(private authService:AuthService, private userImageService:UserImageService) { }

  ngOnInit(): void {
    console.log(this.isLoggedIn + " Navbar");
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn){
      this.getUserImageByToken()
    }

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
  logout() {
    this.authService.logOut();
    window.location.href = "/";
  }
}

