import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthStateService } from "./pages/auth/auth-state.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor (
        private authState: AuthStateService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.authState.isAuthenticated) {
            return true;
        } else {
            return this.router.createUrlTree(['./login']);
        }
    }
}