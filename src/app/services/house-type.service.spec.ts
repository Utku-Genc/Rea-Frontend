import { TestBed } from '@angular/core/testing';

import { HouseTypeService } from './house-type.service';

describe('HouseTypeService', () => {
  let service: HouseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
