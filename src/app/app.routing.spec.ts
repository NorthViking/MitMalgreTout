import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';

//importing routes
import { routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GalleriService } from './galleri/galleri.service';
import { AuthService } from './auth/auth.service';
import { Location } from '@angular/common';





describe('AppComponent routing Example', () => {
  let router: Router;
  let location: Location;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;



  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule],
      declarations: [
        AppComponent,
        WelcomeComponent,
        SignupComponent,
        LoginComponent,
      ],
      providers: [
        GalleriService,
        AuthService,
        ],
    }).compileComponents();
  }));


  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;

    router.initialNavigation();
  });

  it('should test redirection to default path (async)', (() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    });
  }));



  it('should test component with navigating to specific Route', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    router.navigate(['galleri/public']);
    tick();
    expect(location.path()).toBe('/galleri/public');

  }))


});
