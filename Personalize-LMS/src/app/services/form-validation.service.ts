import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  // Validator for required fields
  required(control: FormControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  // Validator for mobile number (10 digits)
  mobileNumber(control: FormControl): ValidationErrors | null {
    const pattern = /^\d{10}$/;
    return pattern.test(control.value) ? null : { invalidMobile: true };
  }

  // Validator for email
  email(control: FormControl): ValidationErrors | null {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return pattern.test(control.value) ? null : { invalidEmail: true };
  }
}
