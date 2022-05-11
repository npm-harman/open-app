import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  user = JSON.parse(localStorage.getItem('user') || '[]');

  constructor(private authService: AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), // to auto unsubscribe after accessing the value once
      exhaustMap(user=>{ // used to merge observables
        // if(!user){
        //   return next.handle(req);
        // }
        const modifiedReq = req.clone({  
          setHeaders: {
          Authorization: `Bearer ${this.user.token}`
        }});
        return next.handle(modifiedReq);
      })
    )
  }
}
