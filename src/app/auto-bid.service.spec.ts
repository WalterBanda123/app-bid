import { TestBed } from '@angular/core/testing';

import { AutoBidService } from './auto-bid.service';

describe('AutoBidService', () => {
  let service: AutoBidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoBidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
