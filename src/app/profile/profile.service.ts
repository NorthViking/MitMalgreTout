import { ProfileInfo } from './profile.model';

export class ProfileService{
private profileInfos: ProfileInfo[] = [];

getProfileInfos(){
  return [...this.profileInfos];
  }

  addProfileInfo(profileInfos: string, profilePicture: string, firstName: string, lastName: string, dateOfBirth: string, email: string, phoneNumber: string, interests: string, myEvents: string, myMedia: string){
    const profileInfo: ProfileInfo = {profileInfos: profileInfos, profilePicture: profilePicture, firstName: firstName, lastName:lastName, dateOfBirth:dateOfBirth, email:email, phoneNumber: phoneNumber, interests: interests, myEvents: myEvents, myMedia: myMedia}
    this.profileInfos.push(profileInfo);
  }
}
