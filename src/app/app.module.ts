import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { ProfileCreateComponent } from './profile-create/profile-create.component';




@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent,
    HeaderComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    ProfileCreateComponent


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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
