import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ListingService } from '../services/listing.service';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingOwnerGuard implements CanActivate {
  constructor(private listingService: ListingService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const listingIdParam = route.paramMap.get('id');
    if (!listingIdParam) {
      this.router.navigate(['/unauthorized']);
      return new Observable<boolean>(observer => observer.next(false));
    }

    const listingId = +listingIdParam;

    return this.listingService.getByToken().pipe(
      map(response => {
        const listings: Listing[] = response.data;
        const userOwnsListing = listings.some(listing => listing.id === listingId);
        if (userOwnsListing) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );

  }
}