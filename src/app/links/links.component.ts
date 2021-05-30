import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Info } from './links.model';
import { LinksService } from './links.service'

@Component({
  selector: 'app-links-create',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit{
  isLoading = false
  form: FormGroup;
  enteredProfileInfoId = "";
  enteredProfileInfo = "";
  enteredProfilePicture = "";
  enteredFirstName = "";
  enteredLastName = "";
  enteredDateOfBirth = "";
  enteredEmail = "";
  enteredPhoneNumber = "";
  enteredInterests = "";
  enteredMyEvents = "";
  enteredMyMedia = "";
  mode = 'create';
  private profileInfoId: string;
  profileInfo : Info;
  Info: { profileInfoId: any; profilePicture: any; firstName: any; lastName: any; dateOfBirth: any; email: any; phoneNumber: any; interests: any; myEvents: any; myMedia: any; };

  constructor(public linksService: LinksService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
      'profileInfo': new FormControl(null,
        {validators: [Validators.required]
        }),
        'profilePicture': new FormControl(null, { validators: [Validators.required]}),
        'firstName': new FormControl(null, { validators: [Validators.required]}),
        'lastName': new FormControl(null, { validators: [Validators.required]}),
        'dateOfBirth': new FormControl(null, { validators: [Validators.required]}),
        'email': new FormControl(null, { validators: [Validators.required]}),
        'phoneNumber': new FormControl(null, { validators: [Validators.required]}),
        'interests': new FormControl(null, { validators: [Validators.required]}),
        'myEvents': new FormControl(null, { validators: [Validators.required]}),
        'myMedia': new FormControl(null, { validators: [Validators.required]}),

    });
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has("profileInfoId")){
        this.mode = 'edit';
        this.profileInfoId = paramMap.get("profileInfoId");
        this.isLoading = true;
        //this.linksService.getProfileInfo(this.profileInfoId).subscribe(profileData => {
          //this.isLoading = false;
          //this.Info = {
            //profileInfoId: profileData.profileInfoId,
            //profilePicture: profileData.profilePicture,
            //firstName: profileData.firstName,
            //lastName: profileData.lastName,
            //dateOfBirth: profileData.dateOfBirth,
            //email: profileData.email,
            //phoneNumber: profileData.profileInfo,
            //interests: profileData.interests,
            //myEvents: profileData.myEvents,
            //myMedia: profileData.myMedia
          };
          this.form.setValue({profileInfoId: this.Info.profileInfoId,
            profilePicture: this.Info.profilePicture,
            firstName: this.Info.firstName,
            lastName: this.Info.lastName,
            dateOfBirth: this.Info.dateOfBirth,
            email: this.Info.email,
            phoneNumber: this.Info.phoneNumber,
            interests: this.Info.interests,
            myEvents: this.Info.myEvents,
            myMedia: this.Info.myMedia
          });
        });
      //} else{
       // this.mode = 'create';
        //this.profileInfoId = null;
     // }
    //});
  }

  onAddProfileInfo(form: NgForm) {
    if(form.valid){
      return;
    }
    this.linksService.addProfileInfo(
      form.value.profileInfoId,
       form.value.profileInfo,
       form.value.profilePicture,
       form.value.firstName,
       form.value.lastName,
       form.value.dateofBirth,
       form.value.email,
       form.value.phoneNumber,
       form.value.interests,
       form.value.myEvents,
       form.value.myMedia);
    }
}
