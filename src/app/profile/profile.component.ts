import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  new
  onGoToProfileInfo(){
    alert('Go to profile info');
  }
  onGoToMyMedia(){
    alert('Go to media');
  }

  ngOnInit(): void {
  }

}
