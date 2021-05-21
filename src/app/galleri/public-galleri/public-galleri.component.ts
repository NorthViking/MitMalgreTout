import { Component, OnDestroy, OnInit } from '@angular/core';
import { Media } from '../media.model'
import { GalleriService } from '../galleri.service'
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-public-galleri',
  templateUrl: './public-galleri.component.html',
  styleUrls: ['./public-galleri.component.css']
})
export class PublicGalleriComponent implements OnInit, OnDestroy{

  private mediasSub: Subscription;
  isLoading = false;
  medias: Media[] =[];
  totalMedia = 10;
  mediaPerPage = 5;
  pageSizeOptions = [5, 10, 25, 40];
  currentPage = 1;

  constructor(public galleriServise: GalleriService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.galleriServise.getMedias(this.mediaPerPage, this.currentPage);
    this.mediasSub = this.galleriServise.getGalleriUpdateListener()
    .subscribe((mediaData: {medias: Media[], mediaCount: number}) => {
      this.isLoading=false;
      this.totalMedia = mediaData.mediaCount;
      this.medias = mediaData.medias;
    });
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.mediaPerPage = pageData.pageSize;
    this.galleriServise.getMedias(this.mediaPerPage, this.currentPage);

  }

ngOnDestroy(){
  this.mediasSub.unsubscribe();
}

}
