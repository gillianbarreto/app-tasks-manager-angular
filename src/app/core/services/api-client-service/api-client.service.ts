import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@environment';
import { DataResponse } from './data-response';
import { SessionService } from '../session/session.service';

@Injectable()
export abstract class ApiClientService {

  protected urlBase = `${environment.API_URL}`;

  constructor(
    protected http: HttpClient,
    protected sessionService: SessionService
  ) { }

  protected getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'nombre-aplicacion': 'taskManagerApp',
      'Authorization': this.sessionService.getToken() || 'test'
    }
  }

  protected succesData<T>(response: HttpResponse<any>): DataResponse {
    if (response === null || response.status !== 200) throw response;

    return new DataResponse(
      response.body['code'],
      response.body['message'],
      response.body['payload']
    );
  }

  protected handleError(body: any): Observable<DataResponse> {
    const response: DataResponse = new DataResponse(
      0,
      body.error && body.error.mensaje || 'En estos momentos no te podemos atender, favor intenta más tarde',
      body
    );
    return throwError(response);
  }

}
