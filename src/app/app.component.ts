import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Profile } from './profile/profile.model';

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

  storedProfile: Profile [] = [];


  onProfileAdded(profile){
    this.storedProfile.push(profile);

  }
}

