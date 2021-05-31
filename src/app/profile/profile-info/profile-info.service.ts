import { Injectable } from '@angular/core';
import { Media } from './profile-info.model';
import { PictureFile } from './profile-info.model';
import { VideoFile } from './profile-info.model';
import { SoundFile } from './profile-info.model';
import { Subject } from 'rxjs';
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

@Injectable({providedIn: 'root'})
export class ProfileInfoService{
  private medias: Media[] = [];
  private pictureFiles: PictureFile [] = [];
  private videoFiles: VideoFile [] = [];
  private soundFiles: SoundFile [] = [];
  private profilePictures: ProfilePicture[] = [];
  private firstNames: FirstName [] = [];
  private lastNames: LastName [] = [];
  private datesOfBirth: DateOfBirth [] = [];
  private emails: Email[] = [];
  private phoneNumbers: PhoneNumber [] = [];
  private interests: Interest [] = [];
  private myEvents: MyEvent [] = [];
  private myMedias: MyMedia [] = [];
  private textFiles: TextFile [] = [];

  private mediasUpdated = new Subject<Media[]>();
  private pictureFilesUpdated = new Subject<PictureFile[]>();
  private videoFilesUpdated = new Subject<VideoFile[]>();
  private soundFilesUpdated = new Subject<SoundFile[]>();
  private profilePicturesUpdated = new Subject<ProfilePicture[]>();
  private firstNamesUpdated = new Subject<FirstName[]>();
  private lastNamesUpdated = new Subject<LastName[]>();
  private datesOfBirthUpdated = new Subject<DateOfBirth[]>();
  private emailsUpdated = new Subject<Email[]>();
  private phoneNumbersUpdated = new Subject<PhoneNumber[]>();
  private interestsUpdated = new Subject<Interest[]>();
  private myEventsUpdated = new Subject<MyEvent[]>();
  private myMediasUpdated = new Subject<MyMedia[]>();
  private textFilesUpdated = new Subject<TextFile[]>();

  getMedias(){
    return [...this.medias];
  }

  getMediaUpdateListener(){
    return this.mediasUpdated.asObservable();
  }

  getPictureFiles(){
    return [...this.pictureFiles];
  }

  getPictureFileUpdateListener(){
    return this.pictureFilesUpdated.asObservable();
  }

  getVideoFiles(){
    return [...this.videoFiles];
  }

  getVideoFileUpdateListener(){
    return this.videoFilesUpdated.asObservable();
  }

  getSoundFiles(){
    return [...this.soundFiles];
  }

  getSoundFileUpdateListener(){
    return this.soundFilesUpdated.asObservable();
  }

  getProfilePictures(){
    return [...this.profilePictures];
  }

  getProfilePictureUpdateListener(){
    return this.profilePicturesUpdated.asObservable();
  }
  getFirstNames(){
    return [...this.firstNames];
  }

  getFirstNameUpdateListener(){
    return this.firstNamesUpdated.asObservable();
  }
  getLastNames(){
    return [...this.lastNames];
  }

  getLastNameUpdateListener(){
    return this.lastNamesUpdated.asObservable();
  }

  getDatesOfBirth(){
    return [...this.datesOfBirth];
  }

  getDateOfBirthUpdateListener(){
    return this.datesOfBirthUpdated.asObservable();
  }

  getEmails(){
    return [...this.emails];
  }

  getEmailUpdateListener(){
    return this.emailsUpdated.asObservable();
  }

  getPhoneNumbers(){
    return [...this.phoneNumbers];
  }

  getPhoneNumberUpdateListener(){
    return this.phoneNumbersUpdated.asObservable();
  }

  getInterest(){
    return [...this.interests];
  }

  getInterestUpdateListener(){
    return this.interestsUpdated.asObservable();
  }

  getMyEvents(){
    return [...this.myEvents];
  }
  getMyEventUpdateListener(){
    return this.myEventsUpdated.asObservable();
  }

  getMyMedias(){
    return [...this.myMedias];
  }

  getMyMediaUpdateListener(){
    return this.myMediasUpdated.asObservable();
  }

  getTextFiles(){
    return [...this.textFiles];
  }

  getTextFileUpdateListener(){
    return this.textFilesUpdated.asObservable();
  }

  addMedia(title: string, content: string){
    const media: Media = {title: title, content: content}
    this.medias.push(media);
    this.mediasUpdated.next([...this.medias]);
  }

  addPictureFile(title: string, content: string){
    const pictureFile: PictureFile = {title: title, content: content}
    this.pictureFiles.push(pictureFile);
    this.pictureFilesUpdated.next([...this.pictureFiles]);
  }
  addVideoFile(title: string, content: string){
    const videoFile: VideoFile = {title: title, content: content}
    this.videoFiles.push(videoFile);
    this.videoFilesUpdated.next([...this.videoFiles]);
  }

  addSoundFile(title: string, content: string){
    const soundFile: SoundFile = {title: title, content: content}
    this.soundFiles.push(soundFile);
    this.soundFilesUpdated.next([...this.soundFiles]);
  }

  addProfilePicture(title: string, content: string){
    const media: ProfilePicture = {title: title, content: content}
    this.profilePictures.push(media);
    this.profilePicturesUpdated.next([...this.medias]);
  }

  addFirstName(title: string, content: string) {
    const firstName: FirstName = {title: title, content: content}
    this.firstNames.push(firstName);
    this.firstNamesUpdated.next([...this.firstNames]);
  }

  addLastName(title: string, content: string){
    const lastName: LastName = {title: title, content: content}
    this.lastNames.push(lastName);
    this.lastNamesUpdated.next([...this.lastNames]);
  }

  addDateOfBirth(title: string, content: string){
    const dateOfBirth: DateOfBirth = {title: title, content: content}
    this.datesOfBirth.push(dateOfBirth);
    this.datesOfBirthUpdated.next([...this.datesOfBirth]);
  }

  addEmail(title: string, content: string){
    const email: Email = {title: title, content: content}
    this.emails.push(email);
    this.emailsUpdated.next([...this.emails]);
  }

  addPhoneNumber(title: string, content: string) {
    const phoneNumber: PhoneNumber = {title: title, content: content}
    this.phoneNumbers.push(phoneNumber);
    this.phoneNumbersUpdated.next([...this.phoneNumbers]);
  }

  addInterest(title: string, content: string){
    const interest: Interest = {title: title, content: content}
    this.interests.push(interest);
    this.interestsUpdated.next([...this.interests]);
  }

  addMyEvent(title: string, content: string){
    const myEvent: MyEvent = {title: title, content: content}
    this.myEvents.push(myEvent);
    this.myEventsUpdated.next([...this.myEvents]);
  }

  addMyMedia(title: string, content: string){
    const myMedia: MyMedia = {title: title, content: content}
    this.myMedias.push(myMedia);
    this.myMediasUpdated.next([...this.myMedias]);
  }

  addTextFile(title: string, content: string) {
    const textFile: TextFile = {title: title, content: content}
    this.textFiles.push(textFile);
    this.textFilesUpdated.next([...this.textFiles]);
  }

}
