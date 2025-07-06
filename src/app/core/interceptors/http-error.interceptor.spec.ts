import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { ModalService } from '@services';

describe('HttpErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(() => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', [
      'initModal',
      'showModal',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: ModalService, useValue: modalServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
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

  it('on status 0 should show modal ', () => {
    http.get('/url').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(0);
        expect(modalServiceSpy.initModal).toHaveBeenCalledWith('modal-error');
        expect(modalServiceSpy.showModal).toHaveBeenCalled();
      },
    });

    const mockError = new ProgressEvent('error'); // mock error
    httpMock
      .expectOne('/url')
      .error(mockError, { status: 0, statusText: 'Unknown Error' });
  });

  it('on server error should show modal ', () => {
    http.get('/url').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(modalServiceSpy.initModal).toHaveBeenCalledWith('modal-error');
        expect(modalServiceSpy.showModal).toHaveBeenCalled();
      },
    });

    httpMock
      .expectOne('/url')
      .flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('on client error (404) should not show modal', () => {
    http.get('/url').subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(modalServiceSpy.initModal).not.toHaveBeenCalled();
        expect(modalServiceSpy.showModal).not.toHaveBeenCalled();
      },
    });

    httpMock
      .expectOne('/url')
      .flush({}, { status: 404, statusText: 'Not Found' });
  });
});
