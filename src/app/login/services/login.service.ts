import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SessionService } from '@core/services';
import {
  ApiClientService,
  DataResponse,
} from '@core/services/api-client-service';
import { LoginRequest } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ApiClientService {
  constructor(
    protected override http: HttpClient,
    protected override sessionService: SessionService,
  ) {
    super(http, sessionService);
  }

  public login(body: LoginRequest): Observable<DataResponse> {
    // mocked response
    return new Observable(obs =>
      obs.next(
        new DataResponse(200, 'Success', {
          user_id: 1,
          token: 'token',
          email: body.email,
        }),
      ),
    );
  }
}
