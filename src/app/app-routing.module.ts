import {  NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GalleriComponent } from './galleri/galleri.component';
import { PublicGalleriComponent } from './galleri/public-galleri/public-galleri.component';
import  {PersonalGalleriComponent } from './galleri/personal-galleri/personal-galleri.component';
import { AuthGuard } from './auth/authGuard/auth.guard';
//import { ProfileMediaComponent } from './profile/profile-media/profile-media.component';
//import { LinksComponent } from './links/links.component';
import { ProfileComponent } from './profile/profile.component';



export const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profiles', children:[
    {path: 'profile', component: ProfileComponent}]},
  {path: 'galleri', component: GalleriComponent, children:[
    {path: 'public', component: PublicGalleriComponent},
    {path: 'private', component: PersonalGalleriComponent, canActivate: [AuthGuard]},
    {path: 'private/edit/:mediaId', component: PersonalGalleriComponent, canActivate:[AuthGuard]}]}
];
//{path: 'profileMedia/edit/:profileMediaId', component: ProfileMediaComponent, canActivate:[AuthGuard]}
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
