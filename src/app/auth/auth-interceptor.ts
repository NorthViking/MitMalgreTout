import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from './auth.service'
// intercepters er funktioner der vil køre på udgående http requests
@Injectable()
export class AuthIntercepter implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // kopier requesten og edit den kloned requesten headers og sets en extra header
    const authRequest = req.clone({
      headers: req.headers.set('Authorization',"Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
  //vi manipuler en inkommende request og add vores token på auth headeren
}
