import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-profile-media',
  templateUrl: './profile-media.component.html',
  styleUrls: ['./profile-media.component.css']
})

export class ProfileMediaComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() mediaCreated = new EventEmitter();
  @Output() pictureFileCreated= new EventEmitter();
  @Output() videoFileCreated= new EventEmitter();
  @Output() soundFileCreated= new EventEmitter();

  onAddMedia(){
    const media = {title: this.enteredTitle, content: this.enteredContent}
    this.mediaCreated.emit(media);
  }

  onAddPictureFile() {
    const pictureFile = {title: this.enteredTitle,
      content: this.enteredContent}
      this.pictureFileCreated.emit(pictureFile);
  }

  onAddVideoFile(){
    const videoFile = {title: this.enteredTitle,
      content: this.enteredContent}
      this.videoFileCreated.emit(videoFile);
  }

  onAddSoundFile(){
  const soundFile = {title: this.enteredTitle,
    content: this.enteredContent}
    this.soundFileCreated.emit(soundFile);
  }
}
