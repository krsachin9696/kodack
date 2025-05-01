// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent {}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type Stage = 'signup' | 'otp';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  otpForm!: FormGroup;
  stage: Stage = 'signup';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  nextStage() {
    if (this.signupForm.valid) {
      // fake OTP trigger
      this.stage = 'otp';
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  verifyOTP() {
    if (this.otpForm.valid) {
      this.router.navigate(['/login']);
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
