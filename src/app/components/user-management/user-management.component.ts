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
  inactiveToUserId!: number;

  userCount!: number;
  activeUserCount!: number;
  passiveUserCount!: number;

  userPage!: number;
  activeUserPage!: number;
  passiveUserPage!: number;

  filterObject: UserFilter = {
    searchText: null,
    firstName: null,
    lastName: null,
    email: null,
    userId: null,
    status: null,
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
    this.getUserCount();
    this.getActiveUserCount();
    this.getPassiveUserCount();



    let id = this.route.snapshot.paramMap.get('pageId');
    if (id) {
      this.currentPage = parseInt(id, 10);
      this.getUserByPage(this.currentPage, this.usersPerPage);
      const filterStatus = this.route.snapshot.paramMap.get('filterStatus');
      console.log("cons" + filterStatus)
      if (filterStatus !== null) {
        // 'true' ya da 'false' değerlerini boolean'a dönüştürün.
        this.filterObject.status = filterStatus === 'active' ? true : filterStatus === 'inactive' ? false : null;
        this.onSubmit();

        console.log("Filtreli kullanıcı getirme");
      } else {
        this.getUserByPage(this.currentPage, this.usersPerPage);
        console.log("Filtresiz kullanıcı getirme");
      }
      return;
    }
    else{
      this.getUserByPage(this.currentPage, this.usersPerPage)
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
  getOperationClaims() {
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

    if (this.filterObject.status !== null && this.router.url.startsWith("/dashboard/user-management/status/")) {
      const filterStatus = this.filterObject.status;
      this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/.`);
      this.currentPage = 1
      this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/${this.currentPage}`); // Sadece link kısmını güncelle
      this.getUserByPage(this.currentPage, this.usersPerPage)
      return
    }
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
    this.filterObject = {
      searchText: null,
      firstName: null,
      lastName: null,
      email: null,
      userId: null,
      status: null,
      roleIds: [],
      minRegisterDate: null,
      maxRegisterDate: null,
    }
    this.getUserByPage(this.currentPage, this.usersPerPage)
  }

  userHasAdminRole(user: any): boolean {
    return user.operationClaims.some((claim: { name: string; }) => claim.name.toLowerCase() === 'admin');
  }

  setActiveToUserId(userId: number) {
    this.activeToUserId = userId;
    console.log("ActiveToUser" + this.setActiveToUserId)
  }

  activeUser() {
    this.userService.setUserActive(this.activeToUserId).subscribe(response => {
      this.toastrService.info("Kullanıcı aktif edildi", "İşlem Başarılı")
      window.location.reload();

    });
  }

  setInactiveToUserId(userId: number) {
    this.activeToUserId = userId;
    console.log("InactiveToUser" + this.setInactiveToUserId)
  }

  inactiveUser() {
    this.userService.setUserInactive(this.activeToUserId).subscribe(response => {
      this.toastrService.info("Kullanıcı inaktif edildi", "İşlem Başarılı")
      window.location.reload();

    });
  }


  getUserCount() {
    this.userService.getUserCount().subscribe(
      response => {
        this.userCount = response.data;
        // userCount alındıktan sonra userPage hesapla
        this.userPage = Math.ceil(this.userCount / this.usersPerPage);
        console.log("Toplam Üye Sayfa Sayısı: "+this.userPage);
      },
      error => {
        // Hata durumunda uygun bir işlem yapabilirsiniz
        console.error('Error fetching user count:', error);
      }
    );
  }



  getActiveUserCount() {
    this.userService.getActiveUserCount().subscribe(
      response => {
        this.activeUserCount = response.data;
        // userCount alındıktan sonra userPage hesapla
        this.activeUserPage = Math.ceil(this.activeUserCount / this.usersPerPage);
        console.log("Aktif Üye Sayfa Sayısı: "+this.activeUserPage);
      },
      error => {
        // Hata durumunda uygun bir işlem yapabilirsiniz
        console.error('Error fetching user count:', error);
      }
    );

  }
getPassiveUserCount(){
  this.userService.getPassiveUserCount().subscribe(
    response => {
      this.passiveUserCount = response.data;
      // userCount alındıktan sonra userPage hesapla
      this.passiveUserPage = Math.ceil(this.passiveUserCount / this.usersPerPage);
      console.log("İnaktif Üye Sayfa Sayısı: "+this.passiveUserPage);
    },
    error => {
      // Hata durumunda uygun bir işlem yapabilirsiniz
      console.error('Error fetching user count:', error);
    }
  );

}


previousPage() {
  if (this.filterObject.status !== null && this.router.url.startsWith("/dashboard/user-management/status/") && this.currentPage == 1) {
    this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
    const filterStatus = this.filterObject.status;
    this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/${this.currentPage}`); // Sadece link kısmını güncelle
    this.getUserByPage(this.currentPage, this.usersPerPage)
    return
  }
  else if (this.filterObject.status !== null && this.router.url.startsWith("/dashboard/user-management/status/") && this.currentPage != 1) {
    const filterStatus = this.filterObject.status;
    this.currentPage = this.currentPage - 1;
    this.getUserByPage(this.currentPage, this.usersPerPage)
    this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/${this.currentPage}`);
  }
  else if (this.currentPage == 1) {
    this.toastrService.info("Zaten ilk sayfadasınız.", "Bilgilendirme")
    return
  } else {
    this.currentPage = this.currentPage - 1
    this.getUserByPage(this.currentPage, this.usersPerPage);
    this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`); // Sadece link kısmını güncelle
  }
}


nextPage() {
  // Max sayfa sayısını duruma göre belirle
  let maxPage = this.getMaxPageBasedOnStatus();

  if (this.currentPage >= maxPage) {
    this.toastrService.info("Son sayfaya ulaştınız.", "Bilgilendirme");
    return;
  }

  this.currentPage = this.currentPage + 1;

  // Status değeri ve URL yapısına göre yönlendirme
  if (this.filterObject.status !== null && this.router.url.startsWith("/dashboard/user-management/status/")) {
    const filterStatus = this.filterObject.status;
    this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/${this.currentPage}`);
  } else {
    this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`);
  }

  this.getUserByPage(this.currentPage, this.usersPerPage);
}

// Max sayfa sayısını duruma göre hesapla
getMaxPageBasedOnStatus(): number {
  if (this.filterObject.status === true) {
    return this.activeUserPage;
  } else if (this.filterObject.status === false) {
    return this.passiveUserPage;
  } else {
    return this.userPage;
  }
}

// Sayfa sayısı hesaplamaları
calculatePageCounts() {
  this.userPage = Math.ceil(this.userCount / this.usersPerPage);
  this.activeUserPage = Math.ceil(this.activeUserCount / this.usersPerPage);
  this.passiveUserPage = Math.ceil(this.passiveUserCount / this.usersPerPage);
  console.log('UserPage:', this.userPage);
  console.log('ActiveUserPage:', this.activeUserPage);
  console.log('PassiveUserPage:', this.passiveUserPage);
}


setPageNumber(pageNumber: number) {
  // Max sayfa sayısını duruma göre belirle
  let maxPage = this.getMaxPageBasedOnStatus();

  // Girilen sayıyı max sayıya eşitle
  if (pageNumber > maxPage) {
    pageNumber = maxPage;

    this.toastrService.warning("Gitmek istediğiniz sayfa yok. Son sayfaya yönlendirildiniz.", "Dikkat");

  }

  this.currentPage = pageNumber;

  if (this.filterObject.status !== null && this.router.url.startsWith("/dashboard/user-management/status/")) {
    const filterStatus = this.filterObject.status;
    this.router.navigateByUrl(`/dashboard/user-management/status/${filterStatus}/page/${this.currentPage}`);
  } else {
    this.router.navigateByUrl(`/dashboard/user-management/page/${this.currentPage}`);
  }

  this.getUserByPage(this.currentPage, this.usersPerPage);
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
