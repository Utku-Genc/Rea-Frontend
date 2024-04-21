import { Component, OnInit } from '@angular/core';
import { LandListingService } from '../../services/land-listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LandListing } from '../../models/landListing';

@Component({
  selector: 'app-land-listing',
  templateUrl: './land-listing.component.html',
  styleUrl: './land-listing.component.css'
})
export class LandListingComponent implements OnInit {

  landListing : LandListing[] = [];

  currentPage = 1; 
  listingsPerPage = 12;  



  constructor(private landListingService: LandListingService, private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.getLandListing();
  }

  getLandListing() {
    console.log("getLand")
    this.landListingService.getLandListing().subscribe(response => {
      this.landListing = response.data;
    })

  }

  getLandListingImagePath(landListing: LandListing): string {
    if (landListing.imagePath && landListing.imagePath.length > 0) {
      return 'https://localhost:44318/Uploads/ListingImages/' + landListing.imagePath;
    } else {
      // Default resim yolu
      return 'https://localhost:44318/Uploads/ListingImages/DefaultImage.png';
    }
  }


  get startIndex(): number {
    return (this.currentPage - 1) * this.listingsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.listingsPerPage;
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

  
  get totalPages(): number {
    return Math.ceil(this.landListing.length / this.listingsPerPage);
  }
  
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  get visiblePages(): number[] {
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(start + 3, this.totalPagesArray.length);

    return Array(end - start + 1).fill(0).map((_, index) => start + index);
}

  
}
