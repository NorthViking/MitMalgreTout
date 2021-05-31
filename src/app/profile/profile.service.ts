import { Injectable } from '@angular/core';
import { User } from './profile.model';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class ProfileService{
private profileInfos: User[] = [];
private profileInfosUpdated = new Subject<User[]>();
  transformedProfileInfos: User[];

constructor(private http: HttpClient, private router:Router){}



getProfileInfo(id: string){
  return this.http.get<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicturePath: string;
    dateOfBirth: Date;
    phoneNumber: string;
    interests: string;
  }>("http://localhost:3000/api/user/" + id);

}
getProfileInfoUpdateListener(){
  return this.profileInfosUpdated.asObservable();
}

addProfileInfo(firstName: string, lastName: string,
  email: string, profilePicture: File ,
  dateOfBirth: any, phoneNumber: string, interests: string ){
  const postData = new FormData();
    postData.append("firstName", firstName);
    postData.append("lastName", lastName);
    postData.append("email", email);
    postData.append("profilePicture", profilePicture);
    postData.append('dateOfBirth', dateOfBirth);
    postData.append('phoneNumber', phoneNumber);
    postData.append("interests", interests);
  this.http
  .post<{message: string; post: User}>(
    "http://localhost:3000/api/mediaPosts",
    postData
  )
  .subscribe(responseData => {

    window.location.reload();

  });
}

updateProfile(id: string, firstName: string, lastName: string,
  email: string, profilePicture: File | string,
  dateOfBirth: any, phoneNumber: string, interests: string){
  let postData: User | FormData;
  if(typeof profilePicture === "object") {
    postData = new FormData();
    postData.append("id", id);
    postData.append("firstName", firstName);
    postData.append("lastName", lastName);
    postData.append("email", email);
    postData.append("profilePicture", profilePicture);
    postData.append('dateOfBirth', dateOfBirth);
    postData.append('phoneNumber', phoneNumber);
    postData.append("interests", interests);

  } else{
    postData ={
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      profilePicturePath: profilePicture,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      interests: interests,
    };
  }
  this.http
  .put("http://localhost:3000/api/user/" + id, postData)
  .subscribe(response => {

    this.router.navigate(["/profiles"]);
  });
}



  deleteProfile(userId: string){
    this.http.delete("http://localhost/api/users" + userId)
    .subscribe(() => {
      console.log('Deleted!');
    })
  }
}
