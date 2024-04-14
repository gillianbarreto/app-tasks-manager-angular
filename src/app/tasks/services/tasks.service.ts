import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiClientService, SessionService } from '@core/services';
import { Task } from '../models/task';


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

  public getTasksList(userId: number): Observable<any> {
    const url = `${this.urlBase}/tasks?userId=${userId}`;
    return this.http.get(url, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.successBody),
        catchError(this.handleError)
      );
  }

  public addTask(task: Task): Observable<any> {
    const url = `${this.urlBase}/tasks`;
    return this.http.post(url, task, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.successBody),
        catchError(this.handleError)
      );
  }

  public editTask(taskId: string, task: Task): Observable<any> {
    const url = `${this.urlBase}/tasks/${taskId}`;
    return this.http.put(url, task, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.successBody),
        catchError(this.handleError)
      );
  }

  public deleteTask(taskId: string): Observable<any> {
    const url = `${this.urlBase}/tasks/${taskId}`;
    return this.http.delete(url, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(this.successBody),
        catchError(this.handleError)
      );
  }

}
