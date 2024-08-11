import { TestBed } from '@angular/core/testing';
import { OperationClaimsService } from './operation-claims.service';


describe('OperationClaimsService', () => {
  let service: OperationClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
