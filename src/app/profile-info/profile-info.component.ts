import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit {

  @Input() events: Event[] = [];


  ngOnInit() {
  }

}



  //form: FormGroup;
  //onSaveProfile() {
    //}


  //onEditProfile(){



  //onDelete() {
    //}


