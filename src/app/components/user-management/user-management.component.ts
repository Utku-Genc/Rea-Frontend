import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortDirection, SortingObject } from '../../models/sortingObject';
import { UserFilter } from '../../models/userFilter';
import { UserFull } from '../../models/userFull';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  latestUsers!: User[];
  users: UserFull[] = [];

  currentPage = 1;
  usersPerPage = 8;
  selectedSorting: string = "date-1";

  filterObject: UserFilter = {
    searchText: null,
    firstName: null,
    lastName: null,
    email: null,
    userId: null,
    status: true,
    roleIds: [],
    minRegisterDate: 1,
    maxRegisterDate: 99999999999999,
  }

  sorting: SortingObject = {
    sortBy: "date",
    sortDirection: SortDirection.Descending
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
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
    //let pageSize = this.usersPerPage
    //this.getUserImagePath;

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
  getUserImagePath(user: User): string {
    return 'https://localhost:44318/Uploads/UserImages/' + user.imagePath
  }


  getUserByPage(page: number, pageSize: number) {

    this.userService.getPaginatedUsers(this.filterObject, this.sorting, this.currentPage, this.usersPerPage).subscribe(response => {
      this.users = response.data;
      console.log(response.data)

    })
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
