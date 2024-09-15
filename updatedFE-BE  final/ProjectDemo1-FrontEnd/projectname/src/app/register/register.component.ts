

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern for validation
  passwordPattern: RegExp = /^(?=.*[!@#$%^&*])/; // At least one special character required
  showPassword: boolean = false;

  // Track which fields have been touched
  touchedFields: any = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  };

  formErrors: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Track when a field is touched
  onFieldTouched(field: string) {
    this.touchedFields[field] = true;
    this.validateForm();
  }

  validateForm() {
    // First Name validation
    if (this.touchedFields.firstName) {
      this.formErrors.firstName = this.firstName ? '' : 'Please enter your first name.';
    }

    // Last Name validation
    if (this.touchedFields.lastName) {
      this.formErrors.lastName = this.lastName ? '' : 'Please enter your last name.';
    }

    // Email validation
    if (this.touchedFields.email) {
      if (!this.email) {
        this.formErrors.email = 'Please enter your email.';
      } else if (!this.emailPattern.test(this.email)) {
        this.formErrors.email = 'Please enter a valid email address.';
      } else {
        this.formErrors.email = '';
      }
    }

    // Password validation
    if (this.touchedFields.password) {
      if (!this.password) {
        this.formErrors.password = 'Please enter a password.';
      } else if (!this.passwordPattern.test(this.password)) {
        this.formErrors.password = 'Password must contain at least one special character.';
      } else {
        this.formErrors.password = '';
      }
    }

    // Confirm Password validation
    if (this.touchedFields.confirmPassword) {
      this.formErrors.confirmPassword = this.confirmPassword === this.password ? '' : 'Passwords do not match.';
    }
  }

  onSubmit() {
    this.validateForm();
    if (this.isFormValid()) {
      this.http.post('http://localhost:5046/api/Users/Registration', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }).subscribe(response => {
        window.alert('Registration successfully!');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration error', error);
      });
    }
  }

  isFormValid() {
    return !this.formErrors.firstName && !this.formErrors.lastName &&
           !this.formErrors.email && !this.formErrors.password && !this.formErrors.confirmPassword;
  }
}