import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  readonly authService = inject(AuthService);

  @Output() cancel = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  signupform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.minLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit(): void {
    if (this.signupform.invalid) {
      this.signupform.markAllAsTouched();
      return;
    }

    const { name, email, contact, password } = this.signupform.value;
    if (!name || !email || !contact || !password) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.signup({ name, email, contact, password }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.signupform.reset();
          this.errorMessage.set('');
          this.cancel.emit();
        } else {
          this.errorMessage.set(response.message || 'Registration failed.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg =
          err?.error?.message ||
          (err?.status === 409 ? 'An account with this email already exists.' : null) ||
          (err?.status === 0 ? 'Unable to connect to backend service.' : null) ||
          'Registration failed. Please try again.';
        this.errorMessage.set(msg);
      }
    });
  }

  onCancel(): void {
    this.errorMessage.set('');
    this.cancel.emit();
  }
}

