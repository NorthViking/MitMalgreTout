import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"

import { GalleriService } from '../galleri.service';
import { Galleri } from '../galleri.model'
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-personal-galleri',
  templateUrl: './personal-galleri.component.html',
  styleUrls: ['./personal-galleri.component.css'],
})
export class PersonalGalleriComponent implements OnInit {


  galleri: Galleri;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private galleriId: string;

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
        this.galleriServise.getMedia(this.galleriId).subscribe(galleriData => {
          this.galleri = {
            id: galleriData._id,
            title: galleriData.title,
            imagePath: galleriData.imagePath,
            description: galleriData.description
          };
          this.form.setValue({
            title:this.galleri.title,
            image: this.galleri.imagePath,
            description: this.galleri.description
          });
        });
      } else{
        this.mode = "create";
        this.galleriId = null;
      }
    })
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
}
