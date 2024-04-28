import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { startWith } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  @Output() updateNavbar = new EventEmitter<void>();

  searchText: string = "";
  isLoggedIn: boolean = false;
  userImg: UserImage[] = [];
  user!: User;

  update() {
    this.updateNavbar.emit();
  }
  constructor(private authService: AuthService,
    private userImageService: UserImageService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {



    console.log(this.isLoggedIn + " Navbar");
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.getUser();
      this.getUserImageByToken();
    }

  }


  checkLink(): boolean {
    if (this.router.url.startsWith("/listing")) {
      return false;
    }
    return true;

  }

  getUser() {
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
    if (userImage.imagePath && this.userImg.length > 0) {
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

