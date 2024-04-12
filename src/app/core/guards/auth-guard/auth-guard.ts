import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { SessionService } from '@services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate() {
    if (!this.sessionService.isLogin()) {
      this.sessionService.initStorage();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
