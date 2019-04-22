import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(public toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((success) => {
      if(success instanceof HttpResponse){
        if (success.url.includes('login') || success.url.includes('register') || success.url.endsWith('create') || success.url.includes('delete') || (success.url.includes('mygames'))) {
          this.toastr.success('Success', success.body.message);
        }
      }
    }), catchError((err) => {
      this.toastr.error(err.error.message, 'Error');
      throw err;
    }))
  }
}
