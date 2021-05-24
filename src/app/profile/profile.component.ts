import { Component, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-profile-create',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  enteredProfileImage="";
  enteredFirstName ="";
  enteredLastName ="";
  enteredDateOfBirth = "";
  enteredEmail ="";
  enteredPhoneNumber ="";
  enteredInterests ="";
  enteredMyEvents ="";
  //@Output() profileCreated = new EventEmitter();

  // onAddProfile(){
  //   const profile: Profile = {
  //     profileImage: this.enteredProfileImage,
  //     firstName: this.enteredFirstName,
  //     lastName: this.enteredLastName,
  //     dateOfBirth: this.enteredDateOfBirth,
  //     email: this.enteredEmail,
  //     phoneNumber: this.enteredPhoneNumber,
  //     interests: this.enteredInterests,
  //     myEvents: this.enteredMyEvents
  //   };
  //   this.profileCreated.emit(profile);
  // }
  ngOnInit(): void {
  }

}
