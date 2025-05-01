import apis from "src/constants/apis"; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthUser } from "./auth-state.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginURL = apis.user.login;

    constructor(private http: HttpClient) {}

    login(data: {email: string, password: string }): Observable<any> {
        return this.http.post(this.loginURL, data);
    }

    getCurrentUser(): Observable<{ user: AuthUser }> {
        return this.http.get<{ user: AuthUser}>(apis.user.getUser, { 
            withCredentials: true 
        }).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401) {
                    return throwError(() => new Error('Unautherized'));
                }
                return throwError(() => error)
            })
        );
    }
}