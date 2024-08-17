import { TestBed } from '@angular/core/testing';

import { UserOperationClaimsService } from '../user-operation-claims.service';

describe('UserOperationClaimsService', () => {
  let service: UserOperationClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOperationClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
