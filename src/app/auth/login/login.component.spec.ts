import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ LoginComponent ],
      providers:[AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call auth login method', ()=>{
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthService);
    let loginSpy = spyOn(authService, 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.form.controls['email'].setValue('hool@hool.dk');
    component.form.controls['password'].setValue('hoolho');
    loginElement.triggerEventHandler('submit',null)
    expect(loginSpy).toHaveBeenCalledTimes(1);
  })

  it('form should be invalid ', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBeFalsy();
  })

  it('form should be valid', () => {
    component.form.controls['email'].setValue('hool@hool.dk');
    component.form.controls['password'].setValue('hoolho');
    expect(component.form.valid).toBeTruthy();
  })
});
