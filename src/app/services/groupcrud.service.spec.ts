import { TestBed } from '@angular/core/testing';

import { GroupcrudService } from './groupcrud.service';

describe('GroupcrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupcrudService = TestBed.get(GroupcrudService);
    expect(service).toBeTruthy();
  });
});
