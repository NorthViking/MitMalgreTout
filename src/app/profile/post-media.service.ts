import { Injectable } from '@angular/core';
import { Media } from './profile-media.model';
import { PictureFile } from './profile-media.model';
import { VideoFile } from './profile-media.model';
import { SoundFile } from './profile-media.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileMediaService{
  private medias: Media[] = [];
  private pictureFiles: PictureFile [] = [];
  private videoFiles: VideoFile [] = [];
  private soundFiles: SoundFile [] = [];
  private mediasUpdated = new Subject<Media[]>();
  private pictureFilesUpdated = new Subject<PictureFile[]>();
  private videoFilesUpdated = new Subject<VideoFile[]>();
  private soundFilesUpdated = new Subject<SoundFile[]>();

  getMedias(){
    return [...this.medias];
  }

  getMediaUpdatedListener(){

  }

  getPictureFiles(){
    return [...this.pictureFiles];
  }

  getVideoFiles(){
    return [...this.videoFiles];
  }

  getSoundFiles(){
    return [...this.soundFiles];
  }

  addMedia(title: string, content: string){
    const media: Media = {title: title, content: content}
    this.medias.push(media);
    this.mediasUpdated.next([...this.medias]);
  }

  addPictureFile(title: string, content: string) {
    const pictureFile: PictureFile = {title: title, content: content}
    this.pictureFiles.push(pictureFile);
    this.pictureFilesUpdated.next([...this.pictureFiles]);
  }

  addVideoFile(title: string, content: string){
    const videoFile: VideoFile = {title: title, content: content}
    this.videoFiles.push(videoFile);
    this.videoFilesUpdated.next([...this.videoFiles]);
  }

  addSoundFile(title: string, content: string){
    const soundFile: SoundFile = {title: title, content: content}
    this.soundFiles.push(soundFile);
    this.soundFilesUpdated.next([...this.soundFiles]);
  }
}
