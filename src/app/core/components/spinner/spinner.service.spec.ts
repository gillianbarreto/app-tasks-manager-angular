import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returnSpinner())', () => {
    service.returnSpinner();
    expect(service).toBeTruthy();
  });

  it('openSpinner())', () => {
    service.openSpinner();
    expect(service).toBeTruthy();
  });

  it('closeSpinner())', () => {
    service.closeSpinner();
    expect(service).toBeTruthy();
  });
});
