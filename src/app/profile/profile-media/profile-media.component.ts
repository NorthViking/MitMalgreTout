import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileMediaService } from '../post-media.service';
import { Media } from '../profile-media.model';
import { PictureFile } from '../profile-media.model';
import { VideoFile } from '../profile-media.model';
import { SoundFile } from '../profile-media.model';


@Component({
  selector: 'app-profile-media',
  templateUrl: './profile-media.component.html',
  styleUrls: ['./profile-media.component.css']
})

export class ProfileMediaComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public profileMediaService: ProfileMediaService){

  }
  onAddMedia(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const media = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileMediaService.addMedia(form.value.title, form.value.content);
  }

  onAddPictureFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const pictureFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileMediaService.addPictureFile(form.value.title, form.value.content);
  }

  onAddVideoFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const videoFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileMediaService.addVideoFile(form.value.title, form.value.content)
  }

  onAddSoundFile(form: NgForm){
    if(form.invalid){
      return;
    }
    const soundFile = {
      title: form.value.title,
      content: form.value.content
    };
    this.profileMediaService.addSoundFile(form.value.title, form.value.content)
  }
}
