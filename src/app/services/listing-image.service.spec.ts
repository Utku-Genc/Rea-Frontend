import { TestBed } from '@angular/core/testing';

import { AddListingImageService } from './listing-image.service';

describe('AddListingImageService', () => {
  let service: AddListingImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddListingImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
