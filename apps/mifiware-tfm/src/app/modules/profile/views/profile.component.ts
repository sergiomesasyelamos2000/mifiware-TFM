import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageSeverity, Role, User } from '@mifiware-tfm/entity-data-models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AppStoreService } from '../../../core/services/app-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'mifiware-tfm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() userId!: string;
  @Input() title!: string;
  @Input() applyCardClass: boolean = true;
  @Output() saveUser = new EventEmitter<boolean>();
  private destroy$ = new Subject<void>();
  token!: string;
  user!: User;
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

  // ...
  constructor(
    private appStoreService: AppStoreService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
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

    this.title = this.title || 'Profile';
    if (this.config && this.config.data) {
      this.userId = this.config.data.userId;
      this.applyCardClass = this.config.data.applyCardClass;
    }
  }

  ngOnInit(): void {
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.token = auth?.accessToken;
        this.userId = this.userId || auth?.userId;
      });
    this.profileService
      .getUser(this.userId, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
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
    this.profileService
      .updateUser(this.userId, this.profileForm.value, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.appStoreService.setMe(user);
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: 'Se ha producido un error al actualizar el usuario',
            detail: error.error.message,
          });
        },
        complete: () => {
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: 'Se ha actualizado correctamente el usuario',
            detail: 'Sign Up successful',
          });
          this.ref.close();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
