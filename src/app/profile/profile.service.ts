import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileService{

  constructor(private http: HttpClient, private router: Router) {}

  getProfile(id: string){
    return this.http.get<Profile>("http://localhost:3000/api/user/" + id);
  }

  addProfile(profile: Profile) {
    return this.http.post<Profile>("http://localhost:3000/api/user/", profile);
    //this.profiles.push(profile);
    //this.profilesUpdated.next([...this.profiles]);
  }

  updateProfile(profile: Profile) {
    return this.http.put<Profile>("http://localhost:3000/api/user/" + profile.id, profile);
    //this.profiles.push(profile);
    //this.profilesUpdated.next([...this.profiles]);
  }


  private profiles: Profile[] = [];
  private profilesUpdated = new Subject<Profile[]>();

/*
  getMediaUpdateListener() {
    throw new Error('Method not implemented.');
  }
  updateMedia(mediaId: string, title: any, content: any) {
    throw new Error('Method not implemented.');
  }
  getTextFile(textFileId: string) {
    throw new Error('Method not implemented.');
  }
  getMyEvent(myEventId: string) {
    throw new Error('Method not implemented.');
  }
  getPhoneNumber(phoneNumberId: string) {
    throw new Error('Method not implemented.');
  }
  getEmail(emailId: string) {
    throw new Error('Method not implemented.');
  }
  getDateOfBirth(dateOfBirthId: string) {
    throw new Error('Method not implemented.');
  }
  getLastName(lastNameId: string) {
    throw new Error('Method not implemented.');
  }
  getProfilePicture(profilePictureId: string) {
    throw new Error('Method not implemented.');
  }
  getSoundFile(soundFileId: string) {
    throw new Error('Method not implemented.');
  }
  getVideoFile(videoFileId: string) {
    throw new Error('Method not implemented.');
  }
  getPictureFile(pictureFileId: string) {
    throw new Error('Method not implemented.');
  }
  getMedia(mediaId: string) {
    return this.http.get<{
      _id: string;
      title: string,
      mediaPath: string;
      description: string;
      creator: string;
    }>("http://localhost:3000/api/mediaPosts/" + mediaId);

  }


  getMedias(){
    return [...this.medias];
  }

  getMediasUpdateListener(){
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
*/
}
