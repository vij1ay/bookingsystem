import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router, RouterEvent } from '@angular/router'
// import { Store } from '@ngrx/store'
// import * as UserActions from 'app/store/user/actions'
// import {GlobalConstants} from "../../app.globalConstants"

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor(
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      const modRequest = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${accessToken}`)
          .set('Content-Type', 'application/json')
          .set('x-requested-with', 'XMLHttpRequest'),
      })
      return next.handle(modRequest).pipe(
        catchError(error => {
          if (error.status == 401) {
            //this.store.dispatch(new UserActions.Logout())
            // store.remove("accessToken");
            // store.remove("image_per");
            // // GlobalConstants.dnsPermissions = '';
						this.router.navigate(["/"],{
              queryParams: { is_token_expired: true },
            });
          }
          const errorMessage = error.statusText || error.error.message
          return throwError(errorMessage)
        }),
      )
    } else {
      const req = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('x-requested-with', 'XMLHttpRequest'),
      })
      return next.handle(req)
    }
  }
}
