 import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { SignupComponent } from './signup.component';
 import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import {FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

 describe('SignupComponent', () => {
   let component: SignupComponent;
   let fixture: ComponentFixture<SignupComponent>;

   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule,
      HttpClientModule],
       declarations: [ SignupComponent ]
     })
     .compileComponents();
   });

   beforeEach(() => {
     fixture = TestBed.createComponent(SignupComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   it('should call auth singup method', ()=>{
    let signUpElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthService);
    let signUpSpy = spyOn(authService, 'createUser').and.callThrough();
    signUpElement = fixture.debugElement.query(By.css('form'));
    component.form.controls['firstName'].setValue('caspar');
    component.form.controls['lastName'].setValue('Mortensen');
    component.form.controls['email'].setValue('hool@hool.dk');
    component.form.controls['password'].setValue('hoolho');
    component.form.controls['agree1'].setValue('mat-checkbox-checked');
    component.form.controls['agree2'].setValue('mat-checkbox-checked');
    signUpElement.triggerEventHandler('submit',null);
    expect(signUpSpy).toHaveBeenCalledTimes(1);
  })

  it('form should be invalid ', () => {
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    component.form.controls['agree1'].setValue('');
    component.form.controls['agree2'].setValue('');
    expect(component.form.valid).toBeFalsy();
  })

  it('form should be valid', () => {
    component.form.controls['firstName'].setValue('caspar');
    component.form.controls['lastName'].setValue('Mortensen');
    component.form.controls['email'].setValue('hool@hool.dk');
    component.form.controls['password'].setValue('hoolho');
    component.form.controls['agree1'].setValue('mat-checkbox-checked');
    component.form.controls['agree2'].setValue('mat-checkbox-checked');
    expect(component.form.valid).toBeTruthy();
  })
 });
