import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LANGUAGES_ENUM,
  MessageSeverity,
} from '@mifiware-tfm/entity-data-models';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { AppStoreService } from '../../../../core/services/app-store.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../auth.service';
import { UsersService } from '../../../users/users.service';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { OverlayPanel } from 'primeng/overlaypanel';
@Component({
  selector: 'mifiware-tfm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [],
})
export class LogInComponent implements OnInit, OnDestroy {
  @ViewChild('op') op: OverlayPanel;
  error = '';
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;
  userId!: string;
  destroy$: Subject<void> = new Subject<void>();

  valCheck: string[] = ['remember'];
  selectedLanguage: any;
  languages = Object.keys(LANGUAGES_ENUM);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private appStoreService: AppStoreService,
    public layoutService: LayoutService,
    private usersService: UsersService,
    private translocoService: TranslocoService
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
    this.authService
      .login(this.loginForm.value)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((res) => {
          this.userId = res.userId;
          this.appStoreService.setAuth(res);
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: 'Sesión iniciada correctamente',
            detail: 'Login successful',
          });
          return this.usersService
            .getUser(this.userId, res.accessToken)
            .pipe(takeUntil(this.destroy$));
        })
      )
      .subscribe({
        next: (user) => {
          this.appStoreService.setMe(user);
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

  changeLanguage(lang?: string) {
    console.log('changeLanguage', lang);

    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.op.hide();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
