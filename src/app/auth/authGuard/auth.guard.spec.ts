import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/galleri/private'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [AuthGuard, { provide: Router, useValue: routerMock },],
    imports: [HttpClientTestingModule]
  });
  injector = getTestBed();
  authService = injector.inject(AuthService);
  guard = injector.inject(AuthGuard);
});

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

   it('should allow the authenticated user to access app', () => {
     spyOn(authService, 'getIsAuth').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
   });
});
