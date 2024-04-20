import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; 
  userImg: UserImage[] = [];
  user!:User

  constructor(private authService:AuthService, private userImageService:UserImageService,private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.isLoggedIn + " Navbar");
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn){
      this.getUser();
      this.getUserImageByToken();
    }

  }

  getUser(){
    this.userService.getUserByToken().subscribe(response=>{
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
  logout() {
    this.authService.logOut();
    window.location.href = "/";
  }
}

