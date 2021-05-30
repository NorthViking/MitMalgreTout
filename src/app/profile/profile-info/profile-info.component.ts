import { Component, OnInit, Input} from '@angular/core';

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

  @Input() media = [];
  @Input() pictureFile = [];
  @Input() videoFile = [];
  @Input() soundFile = [];

  constructor() { }

  ngOnInit(): void {
  }

}
