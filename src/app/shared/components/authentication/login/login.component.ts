import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly authService = inject(AuthService);

  @Output() switchToRegister = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.get('email')?.value?.trim();
    const password = this.loginForm.get('password')?.value;

    if (!email || !password) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.loginForm.reset();
          this.errorMessage.set('');
          this.cancel.emit();
        } else {
          this.errorMessage.set(response.message || 'Login failed. Please check your credentials.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg =
          err?.error?.message ||
          (err?.status === 401 ? 'Invalid email or password.' : null) ||
          (err?.status === 0 ? 'Unable to connect to backend service. Please check your connection.' : null) ||
          'Login failed. Please try again.';
        this.errorMessage.set(msg);
      }
    });
  }

  onCancel(): void {
    this.errorMessage.set('');
    this.cancel.emit();
  }
}

