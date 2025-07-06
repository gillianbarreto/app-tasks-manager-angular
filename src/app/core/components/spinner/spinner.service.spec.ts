import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    service = TestBed.inject(SpinnerService);
  });

  it('when openSpinner() is called, should emit true', done => {
    service.returnSpinner().subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
    service.openSpinner();
  });

  it('when closeSpinner() is called, should emit false', done => {
    service.returnSpinner().subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
    service.closeSpinner();
  });
});
