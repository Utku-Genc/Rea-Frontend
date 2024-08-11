import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortDirection, SortingObject } from '../../models/sortingObject';
import { UserFilter } from '../../models/userFilter';
import { UserFull } from '../../models/userFull';
import { operationClaims } from '../../models/operationClaims';
import { OperationClaimsService } from '../../services/operation-claims.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  latestUsers!: User[];
  users: UserFull[] = [];
  roles: operationClaims[] = []

  currentPage = 1;
  usersPerPage = 10;
  selectedSorting: string = "id-0";
  activeToUserId!: number;
  inactiveToUserId!:number;

  filterObject: UserFilter = {
    searchText: null,
    firstName: null,
    lastName: null,
    email: null,
    userId: null,
    status:  true,
    roleIds: [],
    minRegisterDate: null,
    maxRegisterDate: null,
  }
  



  sorting: SortingObject = {
    sortBy: "id",
    sortDirection: SortDirection.Ascending
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private operationClaimsService: OperationClaimsService,

    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    console.log(this.filterObject)
    this.getOperationClaims();
    this.getUserByPage(this.currentPage, this.usersPerPage)
    let id = this.route.snapshot.paramMap.get('pageId');
    if (id) {
      this.currentPage = parseInt(id, 10);
      this.getUserByPage(this.currentPage, this.usersPerPage);
      const searchText = this.route.snapshot.paramMap.get('searchText');
      console.log("cons" + searchText)
      if (searchText !== null) {
        this.filterObject.searchText = searchText;
        console.log("2")
      } else {
        this.getUserByPage(this.currentPage, this.usersPerPage);
        console.log("3")

      }

      return;
    }

  }

  logout() {
    this.authService.logOut()
    window.location.href = "/";
  }

  getLatestUsers(pageSize: number) {
    this.userService.getLatestUsers(pageSize).subscribe(
      response =>
        this.latestUsers = response.data
    )
  }
  getUserImagePath(user: UserFull): string {
    if (user.imagePath) {
      return 'https://localhost:44318/Uploads/UserImages/' + user.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/UserImages/DefaultImage.png';
    }
  }

  getUserByPage(page: number, pageSize: number) {

    this.userService.getPaginatedUsers(this.filterObject, this.sorting, this.currentPage, this.usersPerPage).subscribe(response => {
      this.users = response.data;
      console.log(response.data)

    })
  }
  getOperationClaims(){
    this.operationClaimsService.getAll().subscribe(response => {
      this.roles = response.data;
      console.log(this.roles)
    })

  }

  setSorting() {
    if (this.selectedSorting) {
      const [sortBy, sortDirection] = this.selectedSorting.split('-');
      this.sorting.sortBy = sortBy;
      this.sorting.sortDirection = +sortDirection; // "+" kullanarak stringi number'a çeviriyoruz
      this.currentPage = 1;
      this.getUserByPage(this.currentPage, this.usersPerPage);
    }
  }


  onSubmit() {
    console.log(this.filterObject)
    this.router.navigateByUrl(`/dashboard/user-management/page/1`);
    this.currentPage = 1

    this.getUserByPage(this.currentPage, this.usersPerPage)
    
  }





  reset() {
    this.sorting = {
      sortBy: "date",
      sortDirection: SortDirection.Descending
    }
    this.selectedSorting = "date-1";
    this.filterObject= {
      searchText: null,
      firstName: null,
      lastName: null,
      email: null,
      userId: null,
      status:  true,
      roleIds: [],
      minRegisterDate: null,
      maxRegisterDate: null,
    }
    this.getUserByPage(this.currentPage, this.usersPerPage)
  }


  setActiveToUserId(userId: number) {
    this.activeToUserId = userId;
    console.log("ActiveToUser"+this.setActiveToUserId)
  }

  activeUser() {
    this.userService.setUserActive(this.activeToUserId).subscribe(response => {
      this.toastrService.info("Kullanıcı aktif edildi", "İşlem Başarılı")
      window.location.reload();

    });
  }

  setInactiveToUserId(userId: number) {
    this.activeToUserId = userId;
    console.log("InactiveToUser"+this.setInactiveToUserId)
  }

  inactiveUser() {
    this.userService.setUserInactive(this.activeToUserId).subscribe(response => {
      this.toastrService.info("Kullanıcı inaktif edildi", "İşlem Başarılı")
      window.location.reload();

    });
  }
  previousPage() {
    if (this.currentPage == 1) {
      this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
      return
    } else {
      this.currentPage = this.currentPage - 1
      this.getUserByPage(this.currentPage,this.usersPerPage);
      this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`); // Sadece link kısmını güncelle
    }
  }


  nextPage() {
    if (this.users.length < this.usersPerPage) {
      this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
      return
    } else {
      this.currentPage = this.currentPage + 1;
      this.getUserByPage(this.currentPage,this.usersPerPage);

      this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`); // Sadece link kısmını güncelle

    }
  }

  setPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`);

    this.getUserByPage(this.currentPage,this.usersPerPage);
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
