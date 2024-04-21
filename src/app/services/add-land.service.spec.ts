import { TestBed } from '@angular/core/testing';

import { AddLandService } from './add-land.service';

describe('AddLandService', () => {
  let service: AddLandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
