import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"

import { GalleriService } from '../galleri.service';
import { Galleri } from '../galleri.model'
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-personal-galleri',
  templateUrl: './personal-galleri.component.html',
  styleUrls: ['./personal-galleri.component.css'],
})
export class PersonalGalleriComponent implements OnInit, OnDestroy {


  galleris: Galleri;
  isLoading = false;
  galleriGrid: Galleri[] =[];
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private galleriId: string;
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
      if(paramMap.has("galleriId")) {
        this.mode = "edit";
        this.galleriId = paramMap.get("galleriId");
        this.isLoading = true;
        this.galleriServise.getMedia(this.galleriId).subscribe(galleriData => {
          this.isLoading = false;
          this.galleris = {
            id: galleriData._id,
            title: galleriData.title,
            mediaPath: galleriData.mediaPath,
            description: galleriData.description
          };
          this.form.setValue({
            title:this.galleris.title,
            image: this.galleris.mediaPath,
            description: this.galleris.description
          });
        });
      } else{
        this.mode = "create";
        this.galleriId = null;
      }
    });
    this.galleriServise.getMedias();
    this.galleriSub = this.galleriServise.getGalleriUpdateListener()
    .subscribe((galleriGrid: Galleri[]) => {
      this.galleriGrid = galleriGrid;
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
    if (this.mode === 'create') {
      this.galleriServise.addMedia(
        this.form.value.title,
        this.form.value.image,
        this.form.value.description
      );
    } else {
      this.galleriServise.updateMedia(
        this.galleriId,
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
