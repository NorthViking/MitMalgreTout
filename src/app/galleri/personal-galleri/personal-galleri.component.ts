import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"

import { GalleriService } from '../galleri.service';
import { Media } from '../media.model'
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-personal-galleri',
  templateUrl: './personal-galleri.component.html',
  styleUrls: ['./personal-galleri.component.css'],
})
export class PersonalGalleriComponent implements OnInit, OnDestroy {


  media: Media;
  isLoading = false;
  totalMedia = 10;
  mediaPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 40];
  userIsAuthenticated = false;
  userId: string;
  medias: Media[] =[];
  form: FormGroup;
  imagePreview: string;
  private mode = 'normal';
  private mediaId: string;
  private galleriSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public galleriServise: GalleriService,
    public route : ActivatedRoute,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
    });

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has("mediaId")) {
        this.mode = "edit";
        this.mediaId = paramMap.get("mediaId");
        this.isLoading = true;
        this.galleriServise.getMedia(this.mediaId).subscribe(mediaData => {
          this.isLoading = false;
          this.media = {
            id: mediaData._id,
            title: mediaData.title,
            mediaPath: mediaData.mediaPath,
            description: mediaData.description,
            creator: mediaData.creator
          };
          this.form.setValue({
            title:this.media.title,
            image: this.media.mediaPath,
            description: this.media.description
          });
        });
      } else{
        this.mode = "normal";
        this.mediaId = null;
      }
    });
    this.isLoading = true;
    this.galleriServise.getMedias(this.mediaPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.galleriSub = this.galleriServise
    .getGalleriUpdateListener()
    .subscribe((mediaData: {medias: Media[], mediaCount: number}) => {
      this.isLoading=false;
      this.totalMedia = mediaData.mediaCount;
      this.medias = mediaData.medias;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'normal') {
      this.galleriServise.addMedia(
        this.form.value.title,
        this.form.value.image,
        this.form.value.description
      );
    } else {
      this.galleriServise.updateMedia(
        this.mediaId,
        this.form.value.title,
        this.form.value.image,
        this.form.value.description
      );
    }
    this.form.reset();
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.mediaPerPage = pageData.pageSize;
    this.galleriServise.getMedias(this.mediaPerPage, this.currentPage);

  }

  onDelete(mediaId: string) {
    this.galleriServise.deleteMedia(mediaId).subscribe(() => {
      this.galleriServise.getMedias(this.mediaPerPage, this.currentPage)
    }, () =>{
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.galleriSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
