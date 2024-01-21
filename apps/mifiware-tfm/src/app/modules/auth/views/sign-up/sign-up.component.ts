import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../shared/password-match.directive';

@Component({
  selector: 'mifiware-tfm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z ]+(?:[a-zA-Z ]+)*$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get fullName() {
    return this.signUpForm.controls['fullName'];
  }
  get email() {
    return this.signUpForm.controls['email'];
  }

  get password() {
    return this.signUpForm.controls['password'];
  }
  get confirmPassword() {
    return this.signUpForm.controls['confirmPassword'];
  }
}
