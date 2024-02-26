import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { AppStoreService } from '../../../../core/services/app-store.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'mifiware-tfm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [],
})
export class LogInComponent implements OnInit {
  error = '';
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;

  valCheck: string[] = ['remember'];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private appStoreService: AppStoreService,
    public layoutService: LayoutService
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  get remeberMe() {
    return this.loginForm.controls['remeberMe'];
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.appStoreService.setAuth(res);
        this.notificationService.showToast({
          severity: MessageSeverity.SUCCESS,
          summary: 'Sesión iniciada correctamente',
          detail: 'Login successful',
        });
      },
      error: (error) => {
        this.notificationService.showToast({
          severity: MessageSeverity.ERROR,
          summary: 'Se ha producido un error al iniciar sesión',
          detail: error.error.message,
        });
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
