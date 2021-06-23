import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Media } from './profile-info.model';
import { PictureFile } from './profile-info.model';
import { VideoFile } from './profile-info.model';
import { SoundFile } from './profile-info.model';
import { ProfileInfoService } from './profile-info.service';
import { ProfilePicture } from './profile-info.model';
import { FirstName } from './profile-info.model';
import { LastName } from './profile-info.model';
import { DateOfBirth } from './profile-info.model';
import { Email } from './profile-info.model';
import { PhoneNumber } from './profile-info.model';
import { Interest } from './profile-info.model';
import { MyEvent } from './profile-info.model';
import { MyMedia } from './profile-info.model';
import { TextFile } from './profile-info.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from 'src/app/galleri/personal-galleri/mime-type.validator';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
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
  enteredTitle = "";
  enteredContent = "";
  media: Media [] = [];
  medias: Media[] = [];
  pictureFiles: PictureFile [] = [];
  videoFiles: VideoFile [] = [];
  soundFiles: SoundFile [] = [];
  profilePictures: ProfilePicture [] = [];
  firstNames: FirstName[] = [];
  lastNames: LastName [] = []
  datesOfBirth: DateOfBirth [] = [];
  emails: Email [] = []
  phoneNumbers: PhoneNumber[] = [];
  interests: Interest [] = [];
  myEvents: MyEvent [] = [];
  myMedias: MyMedia [] = []
  textFiles: TextFile [] = [];
  isLoading = false;
  form: FormGroup;
  private mode = "upload"
  private mediaId: string;
  private pictureFileId: string;
  private videoFileId: string;
  private soundFileId: string;
  private profilePictureId: string;
  private firstNameId: string;
  private lastNameId: string;
  private dateOfBirthId: string;
  private emailId: string;
  private phoneNumberId: string;
  private interestId: string;
  private myEventId: string;
  private myMediaId: string;
  private textFileId: string;

  private mediasSub: Subscription;
  private pictureFilesSub: Subscription;
  private videoFilesSub: Subscription;
  private soundFilesSub: Subscription;
  private profilePicturesSub: Subscription;
  private firstNamesSub: Subscription;
  private lastNamesSub: Subscription;
  private datesOfBirthSub: Subscription;
  private emailsSub: Subscription;
  private phoneNumbersSub: Subscription;
  private interestsSub: Subscription;
  private myEventsSub: Subscription;
  private myMediasSub: Subscription;
  private textFilesSub: Subscription

  constructor(public profileInfoService: ProfileInfoService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]})
    }),
    this.form = new FormGroup({
      'content': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("mediaId")) {
        this.mode = "edit";
        this.mediaId = paramMap.get("mediaId");
        this.isLoading = true;
        this.profileInfoService.getMedia(this.mediad).subscribe(mediaData => {
          this.isLoading = false;
          this.media = {id: mediaData._id, title:mediaData.title, content: mediaData.content}
        });

        this.form.setValue({'title': this.media.title, 'content': this.media.content});
       } else {
         this.mode = "create";
         this.mediaId = null;
       }
       if (paramMap.has("pictureFileId")) {
        this.mode = "edit";
        this.pictureFileId = paramMap.get("pictureFileId");
        this.isLoading = true;
        this.profileInfoService.getPictureFile(this.pictureFileId).subscribe(pictureFileData => {
          this.isLoading = false;
          this.pictureFile = {id pictureFileData._id, title:pictureFileData, content: pictureFileData.content}
        });
       } else {
         this.mode = "create";
         this.videoFileId = null;
       }
       if (paramMap.has("videoFileId")) {
        this.mode = "edit";
        this.videoFileId = paramMap.get("videoFileId");
        this.isLoading = true;
        this.profileInfoService.getVideoFile(this.videoFileId).subscribe(videoFileData => {
          this.isLoading = false;
          this.videoFile = {id videoFileData._id, title:videoFileData, content: videoFileData.content}
        });
       } else {
         this.mode = "create";
         this.videoFileId = null;
       }

      if (paramMap.has("soundFileId")) {
        this.mode = "edit";
        this.soundFileId = paramMap.get("soundFileId");
        this.isLoading = true;
        this.profileInfoService.getSoundFile(this.soundFileId).subscribe(soundFileData => {
          this.isLoading = false;
          this.soundFile = {id soundFileData._id, title:soundFileData, content: soundFileData.content}
        });
       } else {
         this.mode = "create";
         this.soundFileId = null;
       }

       if (paramMap.has("profilePictureId")) {
        this.mode = "edit";
        this.profilePictureId = paramMap.get("profilePictureId");
        this.isLoading = true;
        this.profileInfoService.getProfilePicture(this.profilePictureId).subscribe(profilePictureData => {
          this.isLoading = false;
          this.profilePicture = {id profilePictureData._id, title:profilePictureData, content: profilePictureData.content}
        });
       } else {
         this.mode = "create";
         this.profilePictureId = null;
       }
       if (paramMap.has("firstNameId")) {
        this.mode = "edit";
        this.firstNameId = paramMap.get("firstNameId");
        this.isLoading = true;
        this.profileInfoService.getFirstName(this.firstNameId).subscribe(firstNameData => {
          this.isLoading = false;
          this.firstName = {id firstNameData._id, title:firstNameData, content: firstNameData.content}
        });
       } else {
         this.mode = "create";
         this.firstNameId = null;
       }
       if (paramMap.has("lastNameId")) {
        this.mode = "edit";
        this.lastNameId = paramMap.get("lastNameId");
        this.isLoading = true;
        this.profileInfoService.getLastName(this.lastNameId).subscribe(lastNameData => {
          this.isLoading = false;
          this.lastName = {id lastNameData._id, title:lastNameData, content: lastNameData.content}
        });
       } else {
         this.mode = "create";
         this.lastNameId = null;
       }
       if (paramMap.has("dateOfBirthId")) {
        this.mode = "edit";
        this.dateOfBirthId = paramMap.get("dateOfBirthId");
        this.isLoading = true;
        this.profileInfoService.getDateOfBirth(this.dateOfBirthId).subscribe(dateOfBirthData => {
          this.isLoading = false;
          this.dateOfBirth = {id dateOfBirthData._id, title:dateOfBirthData, content: dateOfBirthData.content}
        });
       } else {
         this.mode = "create";
         this.dateOfBirthId = null;
       }
       if (paramMap.has("emailId")) {
        this.mode = "edit";
        this.emailId = paramMap.get("emailId");
        this.isLoading = true;
        this.profileInfoService.getEmail(this.emailId).subscribe(emailData => {
          this.isLoading = false;
          this.email = {id emailData._id, title:emailData, content: emailData.content}
        });
       } else {
         this.mode = "create";
         this.emailId = null;
       }

       if (paramMap.has("phoneNumberId")) {
        this.mode = "edit";
        this.phoneNumberId = paramMap.get("phoneNumberId");
        this.isLoading = true;
        this.profileInfoService.getPhoneNumber(this.phoneNumberId).subscribe(phoneNumberData => {
          this.isLoading = false;
          this.phoneNumber = {id phoneNumberData._id, title:phoneNumberData, content: phoneNumberData.content}
        });
       } else {
         this.mode = "create";
         this.phoneNumberId = null;
       }

       if (paramMap.has("interestId")) {
        this.mode = "edit";
        this.interestId = paramMap.get("interestId");
        this.isLoading = true;
        this.profileInfoService.getInterest(this.interestId).subscribe(interestData => {
          this.isLoading = false;
          this.interest = {id interestData._id, title:interestData, content: interestData.content}
        });
       } else {
         this.mode = "create";
         this.interestId = null;
       }

       if (paramMap.has("myEventId")) {
        this.mode = "edit";
        this.myEventId = paramMap.get("myEventId");
        this.isLoading = true;
        this.profileInfoService.getMyEvent(this.myEventId).subscribe(myEventData => {
          this.isLoading = false;
          this.myEvent = {id myEventData._id, title:myEventData, content: myEventData.content}
        });
       } else {
         this.mode = "create";
         this.myEventId = null;
       }

       if (paramMap.has("myMediaId")) {
        this.mode = "edit";
        this.myMediaId = paramMap.get("myMediaId");
        this.isLoading = true;
        this.profileInfoService.getMedia(this.myMediaId).subscribe(myMediaData => {
          this.isLoading = false;
          this.myMediaId = {id myMediaData._id, title:myMediaData, content: myMediaData.content}
        });
       } else {
         this.mode = "create";
         this.myMediaId = null;
       }

       if (paramMap.has("textFileId")) {
        this.mode = "edit";
        this.mediaId = paramMap.get("textFileId");
        this.isLoading = true;
        this.profileInfoService.getTextFile(this.textFileId).subscribe(textFileData => {
          this.isLoading = false;
          this.textFile = {id textFileData._id, title:textFileData, content: textFileData.content}
        });
       } else {
         this.mode = "create";
         this.textFileId = null;
       }
    })

    onSaveMedia() {
      if(this.form.invalid)
      return;
    }

    this.isLoading = true;
    if (this.mode === "create") {
      this.profileInfoService.addMedia(this.form.value.title, this.form.value.content);
    } else{
      this.profileInfoService.updateMedia(this.mediaId,
        form.value.title,
        form.value.content);
    }
    this.form.resetForm();

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

    this.mediasSub = this.profileInfoService.getMediaUpdateListener().subscribe((medias: Media[])=> {
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
  }

  onAddMedia(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const media = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileInfoService.addMedia(form.value.title, form.value.content);
    form.resetForm();
  }

  onAddPictureFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const pictureFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileInfoService.addPictureFile(form.value.title, form.value.content);
    form.resetForm();
  }

  onAddVideoFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const videoFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileInfoService.addVideoFile(form.value.title, form.value.content)
    form.resetForm();
  }

  onAddSoundFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const soundFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileInfoService.addSoundFile(form.value.title, form.value.content)
    form.resetForm();
  }
  ngOnDestroy(){
    this.mediasSub.unsubscribe();
    this.pictureFilesSub.unsubscribe();
    this.videoFilesSub.unsubscribe();
    this.soundFilesSub.unsubscribe();
    this.profilePicturesSub.unsubscribe();
    this.firstNamesSub.unsubscribe();
    this.lastNamesSub.unsubscribe();
    this.datesOfBirthSub.unsubscribe();
    this.emailsSub.unsubscribe();
    this.phoneNumbersSub.unsubscribe();
    this.interestsSub.unsubscribe();
    this.myEventsSub.unsubscribe();
    this.myMediasSub.unsubscribe();
    this.textFilesSub.unsubscribe();
  }
}

