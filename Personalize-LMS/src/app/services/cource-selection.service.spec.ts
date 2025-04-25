import { TestBed } from '@angular/core/testing';

import { CourceSelectionService } from './cource-selection.service';

describe('CourceSelectionService', () => {
  let service: CourceSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourceSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
