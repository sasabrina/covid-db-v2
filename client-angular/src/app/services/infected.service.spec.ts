import { TestBed } from '@angular/core/testing';

import { InfectedService } from './infected.service';

describe('InfectedService', () => {
  let service: InfectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
