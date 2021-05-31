import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './profile.model';
import { ProfileService } from './profile.service';
import { mimeType } from '../galleri/personal-galleri/mime-type.validator';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  isLoading = false
  form: FormGroup;
  mode = 'create';
  userId: string;
  user: User;
  profileInfo: User;
  profileImagePreview: string;

  constructor(public profileService: ProfileService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({

      profilePicture: new FormControl(null, { asyncValidators:[mimeType]}),
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      dateOfBirth: new FormControl(null,),
      email: new FormControl(null, { validators: [Validators.required] }),
      phoneNumber: new FormControl(null, { validators: [ Validators.minLength(8)] }),
      interests: new FormControl(null, )

    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("userId")) {
        this.mode = "edit";
        this.userId = paramMap.get("userId");
        this.isLoading = true;
        this.profileService.getProfileInfo(this.userId).subscribe(infoData => {
          this.isLoading = false;
          this.user = {
            id: infoData._id,
            firstName: infoData.firstName,
            lastName: infoData.lastName,
            email: infoData.email,
            profilePicturePath: infoData.profilePicturePath,
            dateOfBirth: infoData.dateOfBirth,
            phoneNumber: infoData.phoneNumber,
            interests: infoData.interests,
          };
          this.form.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            image: this.user.profilePicturePath,
            dateOfBirth: this.user.dateOfBirth,
            phoneNumber: this.user.phoneNumber,
            interests: this.user.interests,
          });
        });
      } else {
        this.mode = "createInfo";
        this.userId = null;
      }

    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ profilePicture: file });
    this.form.get('profilePicture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'upload') {
      this.profileService.addProfileInfo(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.profilePicture,
        this.form.value.dateOfBirth,
        this.form.value.phoneNumber,
        this.form.value.interests,
      );
    } else {
      this.profileService.updateProfile(
        this.userId,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.profilePicture,
        this.form.value.dateOfBirth,
        this.form.value.phoneNumber,
        this.form.value.interests,

      );
    }
    this.form.reset();
  }


  onDelete(userId: string) {
    this.profileService.deleteProfile(userId)
  }
  //   onAddProfileInfo(form: NgForm) {
  //     if(form.valid){
  //       return;
  //     }
  //     this.profileService.addProfileInfo(
  //       form.value.profileInfoId,
  //        form.value.profileInfo,
  //        form.value.profilePicture,
  //        form.value.firstName,
  //        form.value.lastName,
  //        form.value.dateofBirth,
  //        form.value.email,
  //        form.value.phoneNumber,
  //        form.value.interests,
  //        form.value.myEvents,
  //        form.value.myMedia);
  //     }
}
