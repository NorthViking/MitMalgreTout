import { Component, Input, OnInit } from '@angular/core';
import { Info } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-media',
  templateUrl: './profile-media.component.html',
  styleUrls: ['./profile-media.component.css']
})
export class ProfileMediaComponent implements OnInit {

  @Input() profileInfos: Info [] = [];

  constructor(public profileService: ProfileService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
