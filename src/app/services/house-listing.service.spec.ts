import { TestBed } from '@angular/core/testing';

import { HouseListingService } from './house-listing.service';

describe('HouseListingService', () => {
  let service: HouseListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
