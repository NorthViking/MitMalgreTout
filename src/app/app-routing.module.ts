import {  NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GalleriComponent } from './galleri/galleri.component';
import { PublicGalleriComponent } from './galleri/public-galleri/public-galleri.component';
import  {PersonalGalleriComponent } from './galleri/personal-galleri/personal-galleri.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileMediaComponent } from './profile/profile-media/profile-media.component';
import { LinksComponent } from './links/links.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';




const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'links', component: LinksComponent},
  {path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard], children:[
    {path: 'profileInfo', component: ProfileInfoComponent, canActivate: [AuthGuard]},
    { path: 'profileInfo/edit/:profileInfoId', component: ProfileInfoComponent, canActivate:[AuthGuard]},
    {path: 'profileMedia', component: ProfileMediaComponent, canActivate: [AuthGuard]},
    {path: 'profileMedia/edit/:profileMediaId', component: ProfileMediaComponent, canActivate:[AuthGuard]}]},
  {path:'profiles/edit/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'galleri', component: GalleriComponent, children:[
    {path: 'public', component: PublicGalleriComponent},
    {path: 'private', component: PersonalGalleriComponent, canActivate: [AuthGuard]},
    {path: 'private/edit/:mediaId', component: PersonalGalleriComponent, canActivate:[AuthGuard]}]},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
