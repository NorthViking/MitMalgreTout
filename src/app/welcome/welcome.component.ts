import { Component, OnInit } from '@angular/core';
import { Media } from '../galleri/media.model';
import { GalleriService } from '../galleri/galleri.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  isLoading = false;
  private mediasSub: Subscription;
  mediaPerPage = 5;
  totalMedia = 10;
  currentPage = 1;

  medias: Media[] = [];
  constructor(private galleriService: GalleriService) { }

  ngOnInit() {
    this.galleriService.getMedias(this.mediaPerPage, this.currentPage);
    this.mediasSub = this.galleriService.getGalleriUpdateListener()
    .subscribe((mediaData: {medias: Media[], mediaCount: number}) => {
      this.isLoading=false;
      this.totalMedia = mediaData.mediaCount;
      this.medias = mediaData.medias;
    });
  }

}
