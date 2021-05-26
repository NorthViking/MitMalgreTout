import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  enteredTitle = "";
  enteredProfileInfo = "";
  enteredProfilePicture = "";
  enteredFirsName = "";
  enteredLastName = "";
  enteredDateOfBirth = "";
  enteredEmail = "";
  enteredPhoneNumber = "";
  enteredInterests = "";
  enteredMyEvents = "";
  enteredMyMedia = "";

  constructor(public profileService: ProfilesService, public route: ActivatedRoute) {

    ngOnInit(){
      this.route.
    }

    onAddInfo(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.profileService.addInfo(form.value.title, form.value.profileInfo)
    }
  }
}
