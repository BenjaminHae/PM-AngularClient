import { TestBed } from '@angular/core/testing';

import { TouchidService } from './touchid.service';

describe('TouchidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TouchidService = TestBed.get(TouchidService);
    expect(service).toBeTruthy();
  });
});
