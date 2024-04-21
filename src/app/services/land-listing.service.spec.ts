import { TestBed } from '@angular/core/testing';

import { LandListingService } from './land-listing.service';

describe('LandListingService', () => {
  let service: LandListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
