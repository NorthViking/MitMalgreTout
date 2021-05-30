import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Media } from '../profile-media.model';
import { PictureFile } from '../profile-media.model';
import { VideoFile } from '../profile-media.model';
import { SoundFile } from '../profile-media.model';
import { ProfileMediaService } from '../profile-media.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
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

  private mediasSub: Subscription;
  private pictureFilesSub: Subscription;
  private videoFilesSub: Subscription;
  private soundFilesSub: Subscription;

  constructor(public profileMediaService: ProfileMediaService) {}

  ngOnInit(): void {
    this.medias = this.profileMediaService.getMedias();
    this.pictureFiles = this.profileMediaService.getPictureFiles();
    this.videoFiles = this.profileMediaService.getVideoFiles();
    this.soundFiles = this.profileMediaService.getSoundFiles();

    this.mediasSub = this.profileMediaService.getMediaUpdateListener().subscribe((medias: Media[])=> {
      this.medias = medias;
    });
    this.pictureFilesSub = this.profileMediaService.getPictureFileUpdateListener().subscribe((pictureFiles: PictureFile[]) => {
      this.pictureFiles = pictureFiles;
    });
    this.videoFilesSub = this.profileMediaService.getVideoFileUpdateListener().subscribe((videoFiles: VideoFile[]) => {
      this.videoFiles = videoFiles;
    });
    this.soundFilesSub = this.profileMediaService.getSoundFileUpdateListener().subscribe((soundFiles: SoundFile[]) => {
      this.soundFiles = soundFiles;
    });
  }

  ngOnDestroy(){
    this.mediasSub.unsubscribe();
    this.pictureFilesSub.unsubscribe();
    this.videoFilesSub.unsubscribe();
    this.soundFilesSub.unsubscribe();
  }
}
