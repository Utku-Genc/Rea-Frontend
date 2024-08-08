import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { catchError, map } from 'rxjs/operators';
import { SingleResponseModel } from '../models/singleReponseModel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService, private router: Router,private toastrService:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const userId = route.paramMap.get('id');

    // Adminse her türlü erişime izin ver
    if (this.authService.isAdmin()) {
      return true;
    } else {

      if (!userId) {
        this.router.navigate(['']);
        return false;
      }

      return this.userService.getUserStatus(parseInt(userId)).pipe(
        map((response: SingleResponseModel<boolean>) => {
          if (response.data) {
            return true; // Kullanıcı aktifse erişime izin ver
          } else {
            this.router.navigate(['']); // Kullanıcı aktif değilse ana sayfaya yönlendir
            this.toastrService.error("Görüntülemeye çalıştığınız profil kapatılmış ya da yasaklanmış olabilir.Bu profili görüntülemek için yetkiniz yok","Pasif Profil")
            return false;
          }
        }),
        catchError((error) => {
          console.error('Kullanıcı durumu alınırken hata oluştu', error);
          this.router.navigate(['']); // Hata durumunda ana sayfaya yönlendir
          return of(false);
        })
      );
    }
  }
}
