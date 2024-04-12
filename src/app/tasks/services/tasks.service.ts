import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment';
import { ApiClientService, DataResponse, EncryptService, SessionService } from '@core/services';


@Injectable({
  providedIn: 'root'
})
export class TasksService extends ApiClientService {

  constructor(
    protected override http: HttpClient,
    protected override sessionService: SessionService,
  ) {
    super(http, sessionService);
  }

  public getTasksList(userId: number): Observable<DataResponse> {
    /*const url = `${this.urlBase}/tasks?userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.succesData),
        catchError(this.handleError)
      );*/

      return new Observable(obs => obs.next(
        new DataResponse(
          200,
          'Success',
          { "tasks": [
            {
              "id": 1,
              "title": "Comprar leche",
              "description": "Ir al supermercado",
              "completed": false,
              "userId": 1
            },
            {
              "id": 2,
              "title": "Hacer ejercicio",
              "description": "Correr en el parque",
              "completed": false,
              "userId": 1
            },
          ] }
        )
      ));
  }

}
