import { TestBed } from '@angular/core/testing';

import { DevicecrudService } from './devicecrud.service';

describe('DevicecrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicecrudService = TestBed.get(DevicecrudService);
    expect(service).toBeTruthy();
  });
});
