import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(): void {
    if (this.signupform.valid) {
      console.log(this.signupform.value);
      window.alert("Registered")
    }
  }
}
