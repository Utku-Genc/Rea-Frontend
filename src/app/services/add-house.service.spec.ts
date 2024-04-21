import { TestBed } from '@angular/core/testing';

import { AddHouseService } from './add-house.service';

describe('AddHouseService', () => {
  let service: AddHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
