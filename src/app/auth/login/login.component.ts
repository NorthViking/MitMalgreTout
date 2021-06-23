import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

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
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null , {
        validators: [Validators.required, Validators.minLength(6)]})
    });
  }


  onLogin(form: NgForm){
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    this.authService.login(
      form.value.email,
      form.value.password);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
