import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _subject = new Subject<boolean>();

  public returnSpinner(): Observable<boolean> {
    return this._subject.asObservable();
  }

  public openSpinner(): void {
    this._subject.next(true);
  }

  public closeSpinner(): void {
    this._subject.next(false);
  }
}
