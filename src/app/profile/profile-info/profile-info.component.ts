import { Component, OnInit, Input} from '@angular/core';
import { from } from 'rxjs';
import { Media } from '../profile-media.model';
import { PictureFile } from '../profile-media.model';
import { VideoFile } from '../profile-media.model';
import { SoundFile } from '../profile-media.model';
import { ProfileMediaService } from '../post-media.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  //media = [
    //{title: 'first picture file', content: 'first picture file'},
    //{title: 'second picture file', content: 'second picture file'},
    //{title: 'third picture file', content: 'third picture file'},
    //{title: 'first video file', content: 'first videoFile'},
    //{title: 'second video file', content: 'second videoFile'},
    //{title: 'third video file', content: 'third videoFile'},
    //{title: 'first sound file', content: 'first sound file'},
    //{title: 'second sound file', content: 'second sound file'},
    //{title: 'third sound file', content: 'third sound file'},
  //];

  medias: Media[] = [];
  pictureFiles: PictureFile [] = [];
  videoFiles: VideoFile [] = [];
  soundFiles: SoundFile [] = [];

  constructor(public profileMediaService: ProfileMediaService) {}

  ngOnInit(): void {
    this.medias = this.profileMediaService.getMedias();
    this.pictureFiles = this.profileMediaService.getPictureFiles();
    this.videoFiles = this.profileMediaService.getVideoFiles();
    this.soundFiles = this.profileMediaService.getSoundFiles();
  }

}
