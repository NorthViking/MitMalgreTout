import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Info } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  enteredProfileInfoId = "";
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
  mode = 'create';
  private profileInfoId: string;
  profileInfo : Info;

  constructor(public profileService: ProfileService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('profileInfoId')){
        this.mode = 'edit';
        this.profileInfoId = paramMap.get(this.profileInfoId);
        this.profileInfo = this.profileService.getProfileInfo(this.profileInfoId);
      } else{
        this.mode = 'create';
        this.profileInfoId = null;
      }
    });
  }

  onAddProfileInfo(form: NgForm) {
    if(form.valid){
      return;
    }
    this.profileService.addProfileInfo(
      form.value.profileInfoId,
       form.value.profileInfo,
       form.value.profilePicture,
       form.value.firstName,
       form.value.lastName,
       form.value.dateofBirth,
       form.value.email,
       form.value.phoneNumber,
       form.value.interests,
       form.value.myEvents,
       form.value.myMedia);
    }
}
