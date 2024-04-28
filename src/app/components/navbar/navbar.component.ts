import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserImage } from '../../models/userImage';
import { UserImageService } from '../../services/user-image.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { event } from 'jquery';

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
    private route: ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe(()=>{
      console.log(this.isLoggedIn + " Navbar");
      const isAlreadyLoggedIn = this.isLoggedIn
      this.isLoggedIn = this.authService.isAuthenticated();
      console.log(isAlreadyLoggedIn+"  "+this.isLoggedIn)
      if(isAlreadyLoggedIn == true && isAlreadyLoggedIn != this.isLoggedIn){
        this.toastrService.info("Token süreniz doldu tekrardan giriş yapiniz","Lütfen Tekrardan Giriş Yapınız")
        this.router.navigate(["login"])
      }
      if (this.isLoggedIn) {
        this.getUser();
        this.getUserImageByToken();
      }
    })


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

