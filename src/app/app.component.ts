import { Component } from '@angular/core';
import { Profile } from './profile/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MitMalgreTout';
  storedProfile: Profile [] = [];
  }

  onProfileAdded(profile){
    this.storedProfile.push(profile);

  }


