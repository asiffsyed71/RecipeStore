import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { matchPassword, validateEmail } from '../../utils/validators';
import { AuthService, responseData } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  showPassword: boolean = false;
  isLoading = false;
  error!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, validateEmail]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    if (!this.isLoginMode) {
      this.authForm.addControl(
        'confirmPassword',
        new FormControl({ value: '', disabled: true }, Validators.required)
      );
    } else {
      if (this.authForm.get('confirmPassword')) {
        this.authForm.removeControl('confirmPassword');
      }
    }
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;
    this.isLoading = true;
    let authObservable: Observable<responseData>;

    if (!this.isLoginMode) {
      authObservable = this.authService.signup(email, password);
    } else {
      authObservable = this.authService.signin(email, password);
    }
    authObservable.subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    this.authForm.reset();
  }

  onInputChange(error: Boolean) {
    let validatorFn: ValidatorFn = matchPassword(
      this.authForm.get('password') as FormControl
    );
    if (!error && this.authForm.get('password')?.value.length > 0) {
      this.authForm.get('confirmPassword')?.enable();
      this.authForm.get('confirmPassword')?.addValidators(validatorFn);
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    } else {
      this.authForm.get('confirmPassword')?.setValue('');
      this.authForm.get('confirmPassword')?.disable();
      this.authForm.get('confirmPassword')?.removeValidators(validatorFn);
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }
}
