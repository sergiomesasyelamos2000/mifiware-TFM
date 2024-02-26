import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../shared/password-match.directive';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
@Component({
  selector: 'mifiware-tfm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    public layoutService: LayoutService
  ) {}

  get name() {
    return this.signUpForm.controls['name'];
  }
  get surname() {
    return this.signUpForm.controls['surname'];
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

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z ]+(?:[a-zA-Z ]+)*$/),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            /* Validators.pattern(/^[a-zA-Z ]+(?:[a-zA-Z ]+)*$/), */
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

  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.notificationService.showToast({
          severity: MessageSeverity.SUCCESS,
          summary: 'Se ha registrado correctamente',
          detail: 'Sign Up successful',
        });
      },
      error: (error) => {
        this.notificationService.showToast({
          severity: MessageSeverity.ERROR,
          summary: 'Se ha producido un error al registrarse',
          detail: error.error.message,
        });
      },
    });
  }
}
