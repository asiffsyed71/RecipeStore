import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((authenticatedUser) => {
        const modifiedRequest = req.clone({
            params: authenticatedUser?.token
              ? new HttpParams().set('auth', authenticatedUser?.token)
              : undefined
              
          })
        return next.handle(modifiedRequest);
      })
    );
  }
}
