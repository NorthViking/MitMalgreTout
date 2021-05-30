import { Injectable } from '@angular/core';
import { Info } from './links.model';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class linksService{
private profileInfos: Info[] = [];
private profileInfosUpdated = new Subject<Info[]>();
  transformedProfileInfos: Info[];

constructor(private http: HttpClient){}

getProfileInfos(){
  this.http.get<{message: string, profileInfos: any}>
  ("http://localhost:3000/api/profileInfos")
  .pipe(map((profileData) => {
    return profileData.profileInfos.map( info => {
      return {
        profileInfo: info.profileInfo,
        profilePicture: info.profilePicture,
        firstName: info.firstName,
        lastName: info.lastName,
        dateOfBirth: info.dateOfBirth,
        email: info.email,
        phoneNumber: info.phoneNumber,
        interests: info.interests,
        myEvents: info.myEvents,
        myMedia: info.myMedia,
        profileInfoId: info._profileInfoId
      };
    });
  }))
  .subscribe(transformedProfileInfos => {
   this.profileInfos = transformedProfileInfos;
  this.profileInfosUpdated.next([...this.profileInfos]);
  });
}

getProfileInfoUpdateListener(){
  return this.profileInfosUpdated.asObservable();
}

getProfileInfo(profileInfoId:string){
  return {...this.profileInfos.find(p => p.profileInfoId === profileInfoId)};
}

addProfileInfo(_profileInfoId: string, profileInfo: string,
  profilePicture: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  phoneNumber: string,
  interests: string,
  myEvents: string,
  myMedia: string){
    const Info: Info =
    { profileInfoId: _profileInfoId,
      profileInfo: profileInfo,
      profilePicture: profilePicture,
      firstName: firstName,
      lastName: lastName,
      dateofBirth:dateOfBirth,
      email: email, phoneNumber:
      phoneNumber, interests:
      interests, myEvents:
      myEvents, myMedia:
      myMedia};
      this.http.post<{message: string}>('http://localhost:3000/api/profileInfos', profileInfo)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.profileInfos.push(Info);
        this.profileInfosUpdated.next([...this.profileInfos]);
      });
  }

  deleteProfileInforId(_profileInfoId: string){
    this.http.delete("http://localhost/api/profileInfos" + _profileInfoId)
    .subscribe(() => {
      console.log('Deleted!');
    })
  }
}
