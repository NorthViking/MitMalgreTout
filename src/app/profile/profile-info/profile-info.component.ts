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
import { NgForm } from '@angular/forms';

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

  constructor(public profileInfoService: ProfileInfoService) {}

  ngOnInit(): void {

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

