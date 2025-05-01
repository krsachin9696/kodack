import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  userID: string;
  name: string;
  email: string;
  username: string;
}

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    isAuthenticated: false
  });
  
  authState$ = this.authStateSubject.asObservable();

  setAuthState(user: AuthUser): void {
    console.log("setting authState")
    this.authStateSubject.next({
        user, 
        isAuthenticated: true
    })
  }

  clearAuthState(): void {
    this.authStateSubject.next({
        user: null, 
        isAuthenticated: false
    })
  }

  get currentUser(): AuthUser | null {
    return this.authStateSubject.value.user;
  }

  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }
}
