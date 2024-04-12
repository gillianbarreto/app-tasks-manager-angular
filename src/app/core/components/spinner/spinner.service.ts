import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subject = new Subject<boolean>();

  constructor() {
  }

  returnSpinner() {
    return this.subject.asObservable();
  }

  openSpinner() {
    this.subject.next(true);
  }

  closeSpinner() {
    this.subject.next(false);
  }
}
