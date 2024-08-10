import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  latestUsers!:User[];
  currentPage = 1;
  usersPerPage = 8;


  ngOnInit(): void {
    let pageSize = this.usersPerPage
    this.getLatestUsers(pageSize);
    this.getUserImagePath;
  

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });
  }

  constructor(
    private authService: AuthService,
    private userService:UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,




  ) {
    
  }
  logout(){
    this.authService.logOut()
    window.location.href = "/";
  }

  getLatestUsers(pageSize:number){
    this.userService.getLatestUsers(pageSize).subscribe(
      response=>
        this.latestUsers = response.data
    )
  }
  getUserImagePath(user:User):string{
    return 'https://localhost:44318/Uploads/UserImages/' + user.imagePath
  }

  previousPage() {
    if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getLatestUsers(this.currentPage);
      this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }


  nextPage() {
    if (this.latestUsers.length < this.usersPerPage) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else {
      this.currentPage = this.currentPage + 1;
      this.getLatestUsers(this.currentPage);

      this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`); // Sadece link kısmını güncelle

    }
  }

  setPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`);

    this.getLatestUsers(this.currentPage);
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
}
