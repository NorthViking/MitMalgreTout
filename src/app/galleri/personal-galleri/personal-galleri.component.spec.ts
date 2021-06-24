import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalGalleriComponent } from './personal-galleri.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleriService } from '../galleri.service';
import { BehaviorSubject, of } from "rxjs";


const mediass$ = new BehaviorSubject({
  images: [{id: '601d1243d123123s', title: 'Mystang', image: 'path', description: 'lolo adaw'}],
  totalCount: 1,
})

describe('PersonalGalleriComponent', () => {
  let component: PersonalGalleriComponent;
  let fixture: ComponentFixture<PersonalGalleriComponent>;


beforeEach(async () => {
     await TestBed.configureTestingModule({
       imports:[
         HttpClientModule,
         ReactiveFormsModule,
         RouterTestingModule,

        ],
       declarations: [ PersonalGalleriComponent ],
       providers:[{provide: GalleriService, getMedias: ()=> mediass$
      }
    ]

     })
    .compileComponents();
   });

  beforeEach(() => {
         fixture = TestBed.createComponent(PersonalGalleriComponent);
     component = fixture.componentInstance;
    fixture.detectChanges();
   });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

   it('should call addMedia method', ()=>{
    let galleriElement: DebugElement;
    const debugElement = fixture.debugElement;
    let galleriService = debugElement.injector.get(GalleriService);
    let galleriSpy = spyOn(galleriService, 'addMedia').and.callThrough();
    galleriElement = fixture.debugElement.query(By.css('form'));
    component.form.controls['title'].setValue('horse');
    component.form.controls['image'].setValue({target: {files: Image}});
    component.form.controls['description'].setValue('Der her er en hest');
    galleriElement.triggerEventHandler('submit',null);
    expect(galleriSpy).toHaveBeenCalledTimes(1);
  });

  it('form should be invalid ', () => {
    component.form.controls['title'].setValue('');
    component.form.controls['image'].setValue('');
    component.form.controls['description'].setValue('');
    expect(component.form.valid).toBeFalsy();
  })

  it('should call deleteMedia method', ()=> {
    const debugElement = fixture.debugElement;
    let galleriService = debugElement.injector.get(GalleriService);
    spyOn(galleriService, 'deleteMedia').and.callThrough();
    component.onDelete(mediass$.value.images[0].id);
    expect(galleriService.deleteMedia).toHaveBeenCalled();
  });

  // it('should call updateMedia method', () => {
  //   let galleriElement: DebugElement;
  //   const debugElement = fixture.debugElement;
  //   let galleriService = debugElement.injector.get(GalleriService);
  //   let galleriSpy = spyOn(galleriService, 'updateMedia').and.callThrough();
  //   galleriElement = fixture.debugElement.query(By.css('form'));
  //   component.form.controls['title'].setValue('horsess');
  //   component.form.controls['image'].setValue({target: {files: Image}});
  //   component.form.controls['description'].setValue('Der her er en hests');
  //   galleriElement.triggerEventHandler('submit',null);
  //   expect(galleriSpy).toHaveBeenCalledTimes(1);;
  // })


});
