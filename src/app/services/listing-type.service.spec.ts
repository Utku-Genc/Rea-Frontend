import { TestBed } from '@angular/core/testing';

import { ListingTypeService } from './listing-type.service';

describe('ListingTypeService', () => {
  let service: ListingTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
