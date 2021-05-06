import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalGalleriComponent } from './personal-galleri.component';

describe('PersonalGalleriComponent', () => {
  let component: PersonalGalleriComponent;
  let fixture: ComponentFixture<PersonalGalleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalGalleriComponent ]
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
});
