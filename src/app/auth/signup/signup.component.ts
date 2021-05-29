import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authstatus => {
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required] }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null , {
        validators: [Validators.required, Validators.minLength(8)]})
    });
  }


  onSignup(form: NgForm){
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.password);
  }




  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
