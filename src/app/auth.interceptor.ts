import { AuthService } from 'src/app/auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: new HttpHeaders(this.authService.token!),
    });
    //  request = request.clone({
    //     headers: request.headers.set('authorization', this.authService.token!),
    //   });

    return next.handle(newRequest);
  }
}

// export const AuthInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
// useClass: AuthInterceptor,
//   multi: true,
// };
