import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../../core/services/notification.service';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { AppStoreService } from '../../../../core/services/app-store.service';
@Component({
  selector: 'mifiware-tfm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [MessageService],
})
export class LogInComponent implements OnInit {
  error = '';
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private appStoreService: AppStoreService
  ) {
    /* if (this.authService.userValue) {
      this.router.navigate(['pages/home']);
    } */
  }

  get f() {
    return this.loginForm.controls;
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  /* onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const response = this.authService.login(
      this.f['username'].value,
      this.f['password'].value
    );

    if (response) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Signin Successful',
      });
      setTimeout(() => {
        this.router.navigate(['pages/home']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Signin Failed',
      });
    }
    this.loading = false;
  } */

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.appStoreService.setMe(res);
        sessionStorage.setItem('email', res.accessToken);
        this.notificationService.showToast({
          severity: MessageSeverity.SUCCESS,
          summary: 'Login',
          detail: 'Login successful',
        });
      },
      error: (error) => console.error(error),
      complete: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
