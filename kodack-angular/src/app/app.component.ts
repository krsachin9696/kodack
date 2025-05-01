import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/auth/auth.service';
import { AuthStateService } from './pages/auth/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kodack-angular';
  loading = true;

  constructor(
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.fetchUserData() 
  }

  fetchUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        console.log("calling setAuthState on reload")
        this.authState.setAuthState(res.user);
      },
      // error: (err) => {
      //   // if (this.authState.isAuthenticated) {
      //   //   this.authState.clearAuthState();
      //   // }
      //   this.authState.clearAuthState();
      //   this.router.navigate(['/login']);
      // },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
