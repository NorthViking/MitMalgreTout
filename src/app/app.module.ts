import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component'
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GalleriComponent } from './galleri/galleri.component';
import { PublicGalleriComponent } from './galleri/public-galleri/public-galleri.component';
import { PersonalGalleriComponent } from './galleri/personal-galleri/personal-galleri.component';
import { MatInputModule } from '@angular/material/input';
import { AuthIntercepter } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { ProfileMediaComponent } from './profile/profile-media/profile-media.component';
import { LinksComponent } from './links/links.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent,
    HeaderComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    GalleriComponent,
    PublicGalleriComponent,
    PersonalGalleriComponent,
    ErrorComponent,
    ProfileMediaComponent,
    LinksComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
