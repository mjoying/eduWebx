import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Auth} from 'aws-amplify';
import {from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UtilsGeneral} from "../utils/UtilsGeneral";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (UtilsGeneral.checkLogin()) {
      return from(
        Auth.currentSession().then(
          result => {
            return result.getIdToken().getJwtToken();
          })
      ).pipe(
        switchMap(token => {
          const headers = request.headers
            .set('Authorization', 'Bearer ' + token)
          const req = request.clone({headers});
          return next.handle(req);
        })
      );
    };
    return next.handle(request);
  }


}
