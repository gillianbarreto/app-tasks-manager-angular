import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';

import { SessionService } from '@services';
import { routes } from './app.routes';
import { httpInterceptorProviders } from '@core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    httpInterceptorProviders,
    SessionService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
