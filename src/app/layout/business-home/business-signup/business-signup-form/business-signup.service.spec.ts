import { TestBed } from '@angular/core/testing';

import { BusinessSignupService } from './business-signup.service';

describe('BusinessSignupService', () => {
  let service: BusinessSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
