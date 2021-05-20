import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"

import { GalleriService } from '../galleri.service';
import { Media } from '../media.model'
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-personal-galleri',
  templateUrl: './personal-galleri.component.html',
  styleUrls: ['./personal-galleri.component.css'],
})
export class PersonalGalleriComponent implements OnInit, OnDestroy {


  media: Media;
  isLoading = false;
  medias: Media[] =[];
  form: FormGroup;
  imagePreview: string;
  private mode = 'upload';
  private mediaId: string;
  private galleriSub: Subscription;

  constructor(
    public galleriServise: GalleriService,
    public route : ActivatedRoute
    ) {}

  ngOnInit() {


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
            description: mediaData.description
          };
          this.form.setValue({
            title:this.media.title,
            image: this.media.mediaPath,
            description: this.media.description
          });
        });
      } else{
        this.mode = "upload";
        this.mediaId = null;
      }
    });
    this.isLoading = true;
    this.galleriServise.getMedias();
    this.galleriSub = this.galleriServise.getGalleriUpdateListener()
    .subscribe((medias: Media[]) => {
      this.isLoading=false;
      this.medias = medias;
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
    if (this.mode === 'upload') {
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

  onDelete(mediaId: string) {
    this.galleriServise.deleteMedia(mediaId);
  }

  ngOnDestroy() {
    this.galleriSub.unsubscribe();
  }
}
