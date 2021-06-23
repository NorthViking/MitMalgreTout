import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from './profile.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  //media = [
  //{title: 'first picture file', content: 'first picture file'},
  //{title: 'second picture file', content: 'second picture file'},
  //{title: 'third picture file', content: 'third picture file'},
  //{title: 'first video file', content: 'first videoFile'},
  //{title: 'second video file', content: 'second videoFile'},
  //{title: 'third video file', content: 'third videoFile'},
  //{title: 'first sound file', content: 'first sound file'},
  //{title: 'second sound file', content: 'second sound file'},
  //{title: 'third sound file', content: 'third sound file'},
  //];
  profile: Profile;
  imagePreview: string;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private profileId: string;

  constructor(public profileService: ProfileService, public route: ActivatedRoute) { }

  private profilePicturesSub: Subscription;
  private firstNamesSub: Subscription;
  private lastNamesSub: Subscription;
  private datesOfBirthSub: Subscription;
  private emailsSub: Subscription;
  private phoneNumbersSub: Subscription;
  private interestsSub: Subscription;
  private myEventsSub: Subscription;
  private textFilesSub: Subscription;
  private myImageFilesSub: Subscription;
  private mySoundFilesSub: Subscription;
  private myVideoFilesSub: Subscription;

  ngOnInit() {
    this.form = new FormGroup(
      {
        profilePicture: new FormControl(null, {
          validators: [Validators.required], asyncValidators: [mimeType]
        }),
        firstName: new FormControl(null, { validators: [Validators.required] }),
        lastName: new FormControl(null, { validators: [Validators.required] }),
        dateOfBirth: new FormControl(null,),
        email: new FormControl(null, { validators: [Validators.required] }),
        phoneNumber: new FormControl(null, { validators: [Validators.minLength(1)] }),
        interests: new FormControl(null),
        myEvent: new FormControl(null),
        textFile: new FormControl(null),
        myImageFile: new FormControl(null),
        mySoundFile: new FormControl(null),
        myVideoFile: new FormControl(null)
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("profileId")) {
        this.mode = "edit";
        this.profileId = paramMap.get("profileId");
        this.isLoading = true;
        this.profileService.getProfile(this.profileId).subscribe(pData => {
          this.isLoading = false;
          this.profile = pData;
          this.form.setValue({
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            datesOfBirth: this.profile.dateOfBirth,
            email: this.profile.email,
            phoneNumber: this.profile.phoneNumber,
            interests: this.profile.interests,
            myEvent: this.profile.myEvent,
            textFile: this.profile.textFile,
            myImageFile: this.profile.myImageFile,
            mySoundFile: this.profile.mySoundFile,
            myVideoFile: this.profile.myVideoFile
          }
          );
        });
      } else {
        this.mode = "create";
        this.profileId = null;
      }
    });
  }

  onAddProfile() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.profileService.addProfile({
        id: this.form.value.id,
        profilePicturePath: this.form.value.profilePicturePath,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        dateOfBirth: this.form.value.dateOfBirth,
        email: this.form.value.email,
        phoneNumber: this.form.value.phoneNumber,
        interests: this.form.value.interests,
        myEvent: this.form.value.myEvent,
        textFile: this.form.value.textFile,
        myImageFile: this.form.value.myImageFile,
        mySoundFile: this.form.value.mySoundFile,
        myVideoFile: this.form.value.myVideoFile
      });
    } else {
      this.profileService.updateProfile({
        id: this.form.value.id,
        profilePicturePath: this.form.value.profilePicturePath,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        dateOfBirth: this.form.value.dateOfBirth,
        email: this.form.value.email,
        phoneNumber: this.form.value.phoneNumber,
        interests: this.form.value.interests,
        myEvent: this.form.value.myEvent,
        textFile: this.form.value.textFile,
        myImageFile: this.form.value.myImageFile,
        mySoundFile: this.form.value.mySoundFile,
        myVideoFile: this.form.value.myVideoFile
      });
    }
    this.form.reset();
    this.isLoading = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ profilePicture: file });
    this.form.get('profilePicture').updateValueAndValidity();
    //console.log(file);
    //console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

/*
this.isLoading = true;
if (this.mode === "create") {
  this.profileInfoService.addMedia(this.form.value.title, this.form.value.content);
} else{
  this.profileInfoService.updateMedia(this.mediaId,
    this.form.value.title,
    this.form.value.content);
}
this.form.reset();

onIm(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image:file});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(file);
}
this.medias = this.profileInfoService.getMedias();
this.pictureFiles = this.profileInfoService.getPictureFiles();
this.videoFiles = this.profileInfoService.getVideoFiles();
this.soundFiles = this.profileInfoService.getSoundFiles();
this.profilePictures = this.profileInfoService.getProfilePictures();
this.firstNames = this.profileInfoService.getFirstNames();
this.lastNames = this.profileInfoService.getLastNames();
this.datesOfBirth = this.profileInfoService.getDatesOfBirth();
this.emails = this.profileInfoService.getEmails();
this.phoneNumbers = this.profileInfoService.getPhoneNumbers();
this.interests = this.profileInfoService.getInterest();
this.myEvents = this.profileInfoService.getMyEvents();
this.myMedias = this.profileInfoService.getMyMedias();
this.textFiles = this.profileInfoService.getTextFiles();

this.mediasSub = this.profileInfoService.getMediasUpdateListener().subscribe((medias: Media[])=> {
  this.medias = medias;
});
this.pictureFilesSub = this.profileInfoService.getPictureFileUpdateListener().subscribe((pictureFiles: PictureFile[]) => {
  this.pictureFiles = pictureFiles;
});
this.videoFilesSub = this.profileInfoService.getVideoFileUpdateListener().subscribe((videoFiles: VideoFile[]) => {
  this.videoFiles = videoFiles;
});
this.soundFilesSub = this.profileInfoService.getSoundFileUpdateListener().subscribe((soundFiles: SoundFile[]) => {
  this.soundFiles = soundFiles;
});
this.profilePicturesSub = this.profileInfoService.getProfilePictureUpdateListener().subscribe((profilePictures: ProfilePicture[]) => {
  this.profilePictures = profilePictures;
});
this.firstNamesSub = this.profileInfoService.getFirstNameUpdateListener().subscribe((firstNames: FirstName[]) => {
  this.firstNames = firstNames;
});
this.lastNamesSub = this.profileInfoService.getLastNameUpdateListener().subscribe((lastNames: LastName[]) => {
  this.lastNames = lastNames;
});
this.datesOfBirthSub = this.profileInfoService.getDateOfBirthUpdateListener().subscribe((datesOfBirth: DateOfBirth[]) => {
  this.datesOfBirth = this.datesOfBirth;
});
this.emailsSub = this.profileInfoService.getEmailUpdateListener().subscribe((emails: Email[]) => {
  this.emails = emails;
});
this.phoneNumbersSub = this.profileInfoService.getPhoneNumberUpdateListener().subscribe((phoneNumbers: PhoneNumber[]) => {
  this.phoneNumbers = this.phoneNumbers;
});
this.interestsSub = this.profileInfoService.getInterestUpdateListener().subscribe((interests: Interest[]) => {
  this.interests = interests;
});
this.myEventsSub = this.profileInfoService.getMyEventUpdateListener().subscribe((myEvents: MyEvent[]) => {
  this.myEvents = myEvents;
});
this.myMediasSub = this.profileInfoService.getMyMediaUpdateListener().subscribe((myMedias: MyMedia[]) => {
  this.myMedias = myMedias;
});
this.textFilesSub = this.profileInfoService.getTextFileUpdateListener().subscribe((textFiles: TextFile[])=> {
  this.textFiles = textFiles;
});

ngOnDestroy(){
this.profilePicturesSub.unsubscribe();
this.firstNamesSub.unsubscribe();
this.lastNamesSub.unsubscribe();
this.datesOfBirthSub.unsubscribe();
this.emailsSub.unsubscribe();
this.phoneNumbersSub.unsubscribe();
this.interestsSub.unsubscribe();
this.myEventsSub.unsubscribe();
this.textFilesSub.unsubscribe();
this.myImageFilesSub.unsubscribe();
this.mySoundFilesSub.unsubscribe();
this.myVideoFilesSub.unsubscribe();
}

onIm(event: Event, Event: { new(type: string, eventInitDict?: EventInit): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
throw new Error('Function not implemented.');
}*/
