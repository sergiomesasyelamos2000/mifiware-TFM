import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../shared/password-match.directive';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import {
  LANGUAGES_ENUM,
  MessageSeverity,
} from '@mifiware-tfm/entity-data-models';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
@Component({
  selector: 'mifiware-tfm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('op') op: OverlayPanel;
  selectedLanguage: any;
  languages = Object.keys(LANGUAGES_ENUM);
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    public layoutService: LayoutService,
    private translocoService: TranslocoService,
    private route: Router
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
          summary: this.translocoService.translate('SIGN_UP.TOAST.SUCCESS'),
        });
      },
      error: (error) => {
        this.notificationService.showToast({
          severity: MessageSeverity.ERROR,
          summary: this.translocoService.translate('SIGN_UP.TOAST.ERROR'),
          detail: error.error.message,
        });
      },
      complete: () => {
        this.route.navigate(['/auth/login']);
      },
    });
  }

  changeLanguage(lang?: string) {
    console.log('changeLanguage', lang);

    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.op.hide();
  }
}
