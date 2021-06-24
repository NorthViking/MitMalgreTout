import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      let url: string = state.url;
      return this.checkLogin(url)
   }
    private checkLogin(url: string): boolean {
       if (this.authService.getIsAuth()) {
        return true;
      }
      this.authService.redirectToUrl = url;
      this.router.navigate(['/login'])
      return false;
    }
}

