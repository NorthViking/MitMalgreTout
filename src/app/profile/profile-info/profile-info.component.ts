import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {ProfileService} from '../profile.service';
import { ProfileModel } from '../profile.model';
import { ProfileInfo } from "../profile.model";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  enteredTitle="";
  enteredProfilePicture;
  enteredFirstName="";
  enteredLastName="";
  enteredDateOfBirth="";
  enteredEmail="";
  enteredPhoneNumber="";
  enteredInterests="";
  enteredMyEvents="";
  enteredMyMedia="";
  private mode = 'create';

  constructor(
    public profileService: ProfileService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if( paramMap.has('profileInfoId')){
        this.mode = 'edit';
      } else{
        this.mode = 'create';
      }

    });
  }

  onAddInfo(form: NgForm){
    if(form.valid){
      return;
    }
    this.profileService.addInfo(form.value.title, form.value.profileInfo, form.value.profilePicture, form.value.firstName, form.value.lastName, form.value.dateOfBirth, form.value.email, form.value.phoneNumber, form.value.interests, form.value.myEvents, form.value.myMedia);
    form.reset();
  }
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
    }),
      'profilePicture': new FormControl(null, {validators: [Validators.required]
    }),
      'firstName': new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]
    }),
      'lastName': new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]
    }),
      'dateOfBirth': new FormControl(null, {validators: [Validators.required, Validators.minLength(0)]
    }),
      'email': new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]
    }),
      'phoneNumber': new FormControl(null, {validators: [Validators.required, Validators.minLength(0)]
    }),
      'interests': new FormControl(null, {validators: [Validators.required, Validators.minLength(0)]
    }),
      'myEvents': new FormControl(null, {validators: [Validators.required, Validators.minLength(0)]
    }),
      'myMedia': new FormControl(null, {validators: [Validators.required, Validators.minLength(0)]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has(this.profileId)){
        this.mode = "edit";
        this.profileId = paramMap.get("profileId");
        this.isLoading = true;
        this.profilesService.getProfileInfo(this.profileId).subscribe(profileData => {
          this.isLoading = false;
          this.profileInfo = {
            id: profileData._id,
            title: profileData,
            profilePicture: profileData.profilePicture,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            dateOfBirth: profileData.dateOfBirth,
            email: profileData.email,
            phoneNumber: profileData.phoneNumber,
            interests: profileData.interests,
            myEvents: profileData.myEvents,
            myMedia: profileData.myMedia
          };
          this.form.setValue({
            'profileInfo':this.profileInfo.title,
            'profilePicture' : this.profilePicture.profilePicture

        });
        });
        } else{
          this.mode = "create";
          this.profileId = null;
        }

      }
    }
  }

}
