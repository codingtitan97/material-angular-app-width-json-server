import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    console.log('call made');
    let auth = request.headers.get('Authorization');
    auth = 'adding val in interceptor';
    request.headers.set('headers', auth);
    // console.log(request);

    return next.handle(request);
  }
}
