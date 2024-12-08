import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModalService } from '../../auth/auth.modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthModalService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.url.endsWith('/auth/signin/local')) {
      return next.handle(req);
    }
    
    const authToken = this.authSrv.getToken();

    if(req.url.endsWith('/auth/refresh')){
      const authReq = req.clone({
        headers: req.headers.set('Authentication', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authentication', `Bearer ${authToken}`)
    });

    return next.handle(authReq);
  }
}