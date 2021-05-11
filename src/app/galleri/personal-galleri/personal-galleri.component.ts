import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

import {GalleriService} from '../galleri.service'
import { mimeType } from './mime-type.validator'

@Component({
  selector: 'app-personal-galleri',
  templateUrl: './personal-galleri.component.html',
  styleUrls: ['./personal-galleri.component.css']
})
export class PersonalGalleriComponent implements OnInit {

  imagePreview: string;
  form: FormGroup;
  private mode:'create';

  constructor( public galleriServise: GalleriService ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators:[Validators.required, Validators.minLength(4)]
      }),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null,{
        validators:[Validators.required],
        asyncValidators:[mimeType]

      })
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.galleriServise.addMedia(
        this.form.value.title,
        this.form.value.image,
        this.form.value.description
      );

    };
    this.form.reset();
  }
}
