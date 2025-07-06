import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from '@core/components';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('SpinnerInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let spinnerServiceMock: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    spinnerServiceMock = jasmine.createSpyObj('SpinnerService', [
      'openSpinner',
      'closeSpinner',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: SpinnerService, useValue: spinnerServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpinnerInterceptor,
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show spinner before request and hide it after response', fakeAsync(() => {
    const testUrl = '/url';
    http.get(testUrl).subscribe();

    expect(spinnerServiceMock.openSpinner).toHaveBeenCalledTimes(1);
    expect(spinnerServiceMock.closeSpinner).not.toHaveBeenCalled();

    const req = httpMock.expectOne(testUrl);
    req.flush({});

    tick();
    expect(spinnerServiceMock.closeSpinner).toHaveBeenCalledTimes(1);

    flush();
  }));
});
