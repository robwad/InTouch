import { TestBed } from '@angular/core/testing';

import { OrgcrudService } from './orgcrud.service';

describe('OrgcrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgcrudService = TestBed.get(OrgcrudService);
    expect(service).toBeTruthy();
  });
});
