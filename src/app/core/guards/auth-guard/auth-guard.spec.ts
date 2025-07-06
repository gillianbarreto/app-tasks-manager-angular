import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  provideRouter,
} from '@angular/router';

import { SessionService } from '@services';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  let routeMock: ActivatedRouteSnapshot;
  let stateMock: RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sessionServiceSpy = jasmine.createSpyObj('SessionService', [
      'isLogged',
      'initStorage',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SessionService, useValue: sessionServiceSpy },
        provideRouter([]),
      ],
    });

    routeMock = new ActivatedRouteSnapshot();
    stateMock = {} as RouterStateSnapshot;
  });

  it('when user is logged in should return true', async () => {
    sessionServiceSpy.isLogged.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() =>
      AuthGuard(routeMock, stateMock),
    );
    expect(result).toBeTrue();
    expect(sessionServiceSpy.initStorage).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('when user is not logged in should return false and redirect to login', async () => {
    sessionServiceSpy.isLogged.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() =>
      AuthGuard(routeMock, stateMock),
    );
    expect(result).toBeFalse();
    expect(sessionServiceSpy.initStorage).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
