import { LoginService } from 'src/app/shared/services/login.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { finalize, Observable } from 'rxjs';
// import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let loginService = this.inject.get(LoginService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return next.handle(jwtToken);
  }
}
