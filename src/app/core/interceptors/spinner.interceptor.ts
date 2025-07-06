import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { SpinnerService } from '@core/components';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private spinner = inject(SpinnerService);

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    this.spinner.openSpinner();

    return next.handle(req).pipe(
      delay(0),
      finalize(() => this.spinner.closeSpinner()),
    );
  }
}
