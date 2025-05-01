import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword!: false;

  constructor(
    private fb: FormBuilder, 
    private authservice: AuthService,
    private authState: AuthStateService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authservice.login(data).subscribe({
        next: (res) => {
          const user = res.user;

          // set global user state
          this.authState.setAuthState(user)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.log("Error in login", err.error)
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

