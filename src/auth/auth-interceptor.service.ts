import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppToastService } from 'src/app/utils/app-toast.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  user = JSON.parse(localStorage.getItem('user') || '[]');

  constructor(private appToastService: AppToastService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({  
          setHeaders: {
          Authorization: `Bearer ${this.user.token}`
        }});
        return next.handle(modifiedReq).pipe(
          map((event: HttpEvent<any>) => {
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            this.showError(error.error.message);
            return throwError(error);
        }))
      }

      showError(errorMsg: any) {
        this.appToastService.show({
          message: errorMsg,
          class: 'bg-danger text-light',
          delay: 10000,
        });
      }
  }
