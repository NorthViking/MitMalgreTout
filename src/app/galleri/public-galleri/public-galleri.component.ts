import { Component, OnDestroy, OnInit } from '@angular/core';
import {Media} from '../media.model'
import{GalleriService} from '../galleri.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-galleri',
  templateUrl: './public-galleri.component.html',
  styleUrls: ['./public-galleri.component.css']
})
export class PublicGalleriComponent implements OnInit, OnDestroy{

  private mediasSub: Subscription
  isLoading = false;
  medias: Media[] =[];

  constructor(public galleriServise: GalleriService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.galleriServise.getMedias();
    this.mediasSub = this.galleriServise.getGalleriUpdateListener().subscribe((medias: Media[]) =>{
      this.isLoading = false;
      this.medias = medias;
    })
  }

ngOnDestroy(){
  this.mediasSub.unsubscribe();
}

}
