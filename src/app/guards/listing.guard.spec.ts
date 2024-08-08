import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { listingGuard } from './listing.guard';

describe('listingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => listingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
