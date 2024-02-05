import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStoreService } from '../../../core/services/app-store.service';
import { ProfileService } from '../profile.service';
import { Subject, takeUntil } from 'rxjs';
import { IUserState, Role, User } from '@mifiware-tfm/entity-data-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mifiware-tfm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userId!: string;
  token!: string;
  user!: IUserState;
  value!: string;
  profileForm!: FormGroup;
  roles!: any[];
  selectedRole!: Role;

  get name() {
    return this.profileForm.controls['name'];
  }

  get surname() {
    return this.profileForm.controls['surname'];
  }

  get email() {
    return this.profileForm.controls['email'];
  }

  get role() {
    return this.profileForm.controls['role'];
  }

  constructor(
    private appStoreService: AppStoreService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      uuid: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.roles = [
      { label: 'Admin', value: Role.SUPER_ADMIN },
      { label: 'User', value: Role.USER },
    ];
  }

  ngOnInit(): void {
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.token = auth?.accessToken;
        this.userId = auth?.userId;
      });
    this.profileService
      .getUser(this.userId, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          console.log('user: ', user);
          this.user = user;
          this.profileForm.patchValue({
            uuid: user.uuid,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
          });

          this.appStoreService.setMe(user);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit() {
    /* this.authService.signUp(this.signUpForm.value).subscribe({
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
    }); */
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
