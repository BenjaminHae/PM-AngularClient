import { TestBed } from '@angular/core/testing';

import { LogonPersistenceService } from './logon-persistence.service';

describe('LogonPersistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogonPersistenceService = TestBed.get(LogonPersistenceService);
    expect(service).toBeTruthy();
  });
});
