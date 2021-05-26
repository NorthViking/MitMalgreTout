import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  enteredProfileInfo = "";
  enteredProfilePicture = "";
  enteredFirstName = "";
  enteredLastName = "";
  enteredDateOfBirth = "";
  enteredEmail = "";
  enteredPhoneNumber = "";
  enteredInterests = "";
  enteredMyEvents = "";
  enteredMyMedia = "";

  constructor(public profileService: ProfileService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAddProfileInfo(form: NgForm) {
    if(form.valid){
      return;
    }
    this.profileService.addProfileInfo(form.value.profileInfo, form.value.profilePicture, form.value.firstName, form.value.lastName, form.value.dateofBirth, form.value.email, form.value.phoneNumber, form.value.interests, form.value.myEvents, form.value.myMedia);
    }
  }
