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
        case url.endsWith('/config') && method === 'GET':
          return getConfig();
        case url.endsWith('/map') && method === 'GET':
          return getMapData();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getConfig() {
      return ok({
        lat: 51.8276976,
        lang: 16.9560484,
        zoom: 5
      })
    }

    function getMapData() {
      return ok({
        data: {
          'SK12345': {
            lat: 51.8276976,
            lang: 16.9560484,
            id: 'SK12345',
            firstName: 'Jan',
            lastName: 'Kowalski',
            vin: 'VF123354543',
          },
          'SK321321': {
            lat: 50.8276976,
            lang: 17.9560484,
            id: 'SK321321',
            firstName: 'Waldemar',
            lastName: 'Nowak',
            vin: 'WO954391231',
          }
        }
      });
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
