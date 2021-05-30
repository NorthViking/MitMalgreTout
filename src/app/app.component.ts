import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Media } from './profile/profile-media.model';
import { PictureFile } from './profile/profile-media.model';
import { VideoFile } from './profile/profile-media.model';
import { SoundFile } from './profile/profile-media.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MitMalgreTout';

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
