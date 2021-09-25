import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

/**
 * From https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial
 */

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        // case url.endsWith('/auth/login') && method === 'POST':
        //   return authenticate();
        // case url.endsWith('/auth/refresh-token') && method === 'POST':
        //   return refreshToken();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getDataForTable() {
      return ok({ });
    }

    // helper functions

    function ok(returnedBody: any) {
      return of(new HttpResponse({ status: 200, body: returnedBody }));
    }

    function error(message: HttpErrorResponse) {
      return throwError({ error: { message } });
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
