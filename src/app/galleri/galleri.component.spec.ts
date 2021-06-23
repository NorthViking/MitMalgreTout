import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleriComponent } from './galleri.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'

describe('GalleriComponent', () => {
  let component: GalleriComponent;
  let fixture: ComponentFixture<GalleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule],
      declarations: [ GalleriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
