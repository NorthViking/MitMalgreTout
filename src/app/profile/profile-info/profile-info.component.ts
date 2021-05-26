import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Info } from '../profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
profileInfos: Info[] = [];
private profileInfosSub: Subscription;

  constructor(public profileService: ProfileService){}

  ngOnInit() {

    this.profileService.getProfileInfos();
    this.profileInfosSub = this.profileService.getProfileInfoUpdateListener()
    .subscribe((profileInfos: Info[]) => {
      this.profileInfos = profileInfos;
    });
  }

  onDelete(profileInfoId: string) {
    this.profileService.deleteProfileInforId(profileInfoId);

  }

 ngOnDestroy(){
   this.profileInfosSub.unsubscribe();
 }
}
