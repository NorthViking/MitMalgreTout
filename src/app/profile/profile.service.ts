import { Injectable } from '@angular/core';
import { Info } from './profile.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileService{
private profileInfos: Info[] = [];
private profileInfosUpdated = new Subject<Info[]>();

getProfileInfo(){
  return [...this.profileInfos];
  }
getProfileInfoUpdateListener(){
return this.profileInfosUpdated.asObservable();
}

addProfileInfo( profileInfo: string,
  profilePicture: string,
  firstName: string,
  lastName: string,
  dateofBirth: string,
  email: string,
  phonenumber: string,
  interests: string,
  myEvents: string,
  myMedia: string) {
    const info: Info = {profileInfo: profileInfo,
      profilePicture: profilePicture,
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateofBirth,
      email:email,
      phonenumber: phonenumber,
      interests: interests,
      myEvents: myEvents,
      myMedia: myMedia};
      this.profileInfos.push(info);
      this.profileInfosUpdated.next([...this.profileInfos]);
}
}
