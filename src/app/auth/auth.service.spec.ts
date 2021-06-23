import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';


import { Observable } from 'rxjs';
import {HttpResponse} from "@angular/common/http";

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let authService: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService
       ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    service = injector.inject(AuthService);

  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should return false from getIsAuth() method by default', () => {
    expect(service.getIsAuth()).toEqual(false);
  });

  it('should return false from getIsAuth() method when user is logged out', () => {
    service.logout();
    expect(service.getIsAuth()).toEqual(false);
  });
});
