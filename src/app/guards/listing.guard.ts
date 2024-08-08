import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { catchError, map } from 'rxjs/operators';
import { SingleResponseModel } from '../models/singleReponseModel';
import { ListingService } from '../services/listing.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ListingGuard implements CanActivate {

  constructor(private authService: AuthService, private listingService: ListingService, private router: Router,private toastrService:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const listingId = route.paramMap.get('id');

    // Adminse her türlü erişime izin ver
    if (this.authService.isAdmin()) {
      return true;
    } else {

      if (!listingId) {
        this.router.navigate(['']);
        return false;
      }

      return this.listingService.getListingStatus(parseInt(listingId)).pipe(
        map((response: SingleResponseModel<boolean>) => {
          if (response.data) {
            return true; // İlan aktifse erişime izin ver
          } else {
            this.router.navigate(['']); // İkan aktif değilse ana sayfaya yönlendir
            this.toastrService.error("Görüntülemeye çalıştığınız ilan kapatılmış ya da yasaklanmış olabilir.Bu ilanı görüntülemek için yetkiniz yok","Pasif İlan")
            return false;
          }
        }),
        catchError((error) => {
          console.error('İlan durumu alınırken hata oluştu', error);
          this.router.navigate(['']); // Hata durumunda ana sayfaya yönlendir
          return of(false);
        })
      );
    }
  }
}
