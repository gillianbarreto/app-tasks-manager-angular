import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionService } from '@services';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  if (!sessionService.isLogged()) {
    sessionService.initStorage();
    router.navigate(['login']);
    return false;
  }

  return true;
};
