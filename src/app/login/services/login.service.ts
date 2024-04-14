import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// import { environment } from '@environment';
import { EncryptService, SessionService } from '@core/services';
import { ApiClientService, DataResponse } from '@core/services/api-client-service';
import { LoginRequest } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiClientService {

  constructor(
    protected override http: HttpClient,
    protected override sessionService: SessionService,
    // private encryptService: EncryptService
  ) {
    super(http, sessionService);
  }

  public login(body: LoginRequest): Observable<DataResponse> {
    /*const url = `${this.urlBase}/login`;
    const data = { data: this.encryptService.encrypt(body, environment.SECRET_KEY_REQUEST) };
    return this.http.post(url, body, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.succesData),
        catchError(this.handleError)
      );
    */
    // Mockeando la respuesta
    return new Observable(obs => obs.next(
      new DataResponse(
        200,
        'Success',
        { user_id: 1, token: 'token' }
      )
    ));
  }

}
