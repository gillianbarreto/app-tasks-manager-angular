import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@environment';
import { DataResponse } from './data-response';
import { SessionService } from '../session/session.service';

@Injectable()
export abstract class ApiClientService {
  protected urlBase = environment.API_URL;

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService,
  ) {}

  protected getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'nombre-aplicacion': environment.APP_ID,
      Authorization: this.sessionService.getToken() || 'test',
    };
  }

  protected successData(response: HttpResponse<any>): DataResponse {
    if (response === null || response.status !== 200) throw response;

    return new DataResponse(
      response.body['code'],
      response.body['message'],
      response.body['payload'],
    );
  }

  protected successBody(response: HttpResponse<any>): any {
    if (response === null || response.status > 300) throw response;

    return response.body;
  }

  protected handleError(body: any): Observable<DataResponse> {
    const response: DataResponse = new DataResponse(
      0,
      (body.error && body.error.mensaje) ||
        'We are unable to assist you at this time. Please try again later.',
      body,
    );
    return throwError(response);
  }
}
