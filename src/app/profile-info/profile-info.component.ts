import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'node:events';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
  })

  export class ProfileInfoComponent{
  enteredFistName = "";
  enteredLastName = "";
  enteredEmail = "";
  enteredPhoneNumber ="";
  enteredDateOfBirth = "";
  enteredInterests = "";
  enteredMyEvents = "";
  @Output() profileInfoUploaded = new EventEmitter();

  onAddProfileInfo(){
    const profileInfo = {
      firstName: this.enteredFistName,
      lastName: this.enteredLastName,
      email: this.enteredEmail,
      phoneNumber: this.enteredPhoneNumber,
      dateOfBirth: this.enteredDateOfBirth,
      interests: this.enteredInterests,
      myEvents: this.enteredMyEvents


    }
  }

  }

