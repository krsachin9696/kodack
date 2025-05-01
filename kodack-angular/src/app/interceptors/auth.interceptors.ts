import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthStateService } from "../pages/auth/auth-state.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (
        private authState: AuthStateService,
        private router: Router
    ){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
    
        const authReq = req.clone({
            withCredentials: true,
        })

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401) {
                    // Session expired or not logged in
                    this.authState.clearAuthState();
                    this.router.navigate(['/login']);
                } 

                return throwError(() => error);
            })
        );
    }
}