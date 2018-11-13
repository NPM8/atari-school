import { TestBed } from '@angular/core/testing';

import { MagazineListService } from './magazine-list.service';

describe('MagazineListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MagazineListService = TestBed.get(MagazineListService);
    expect(service).toBeTruthy();
  });
});
