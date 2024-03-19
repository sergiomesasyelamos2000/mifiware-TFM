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
import { TranslocoService } from '@ngneat/transloco';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AppStoreService } from '../../../core/services/app-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { passwordMatchValidator } from '../../../shared/password-match.directive';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'mifiware-tfm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() userId!: string;
  @Input() title!: string;
  @Input() isNew: boolean = false;
  @Input() applyCardClass: boolean = true;
  @Output() saveUser = new EventEmitter<boolean>();
  private destroy$ = new Subject<void>();
  token!: string;
  user!: User;
  value!: string;
  profileForm!: FormGroup;
  roles!: any[];
  selectedRole!: Role;
  avatarName!: string;
  avatarEmail!: string;
  globalImageSrc!: string;
  isAdmin!: boolean;

  get uuid() {
    return this.profileForm.controls['uuid'];
  }

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

  get password() {
    return this.profileForm.controls['password'];
  }
  get confirmPassword() {
    return this.profileForm.controls['confirmPassword'];
  }

  constructor(
    private appStoreService: AppStoreService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private translocoService: TranslocoService
  ) {
    this.title = this.title || 'Profile';
    if (this.config && this.config.data) {
      this.userId = this.config.data.userId;
      this.applyCardClass = this.config.data.applyCardClass;
      this.isNew = this.config.data.isNew;
    }
    this.profileForm = this.formBuilder.group(
      {
        photoUrl: [''],
        uuid: [
          { value: '', disabled: !this.isNew },
          [
            Validators.required,
            Validators.pattern(
              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            ),
          ],
        ],
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z ]+(?:[a-zA-Z ]+)*$/),
          ],
        ],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: ['', this.isNew ? Validators.required : null],
        confirmPassword: ['', this.isNew ? Validators.required : null],
      },
      {
        validators: passwordMatchValidator,
      }
    );

    this.roles = [
      { label: 'Admin', value: Role.SUPER_ADMIN },
      { label: 'User', value: Role.USER },
    ];
  }

  ngOnInit(): void {
    this.profileForm.get('name').valueChanges.subscribe((value) => {
      this.avatarName = value;
    });

    this.profileForm.get('email').valueChanges.subscribe((value) => {
      this.avatarEmail = value;
    });
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.token = auth?.accessToken;
        this.userId = this.userId || auth?.userId;
      });
    if (!this.isNew) {
      this.profileService
        .getUser(this.userId, this.token)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: User) => {
            const userRole = this.roles.find(
              (role) => role.value === user.role
            );

            this.user = user;

            this.profileForm.patchValue({
              uuid: user.uuid,
              name: user.name,
              surname: user.surname,
              email: user.email,
              role: userRole,
              photoUrl: user.photoUrl,
            });
            this.isAdmin = user.role === Role.SUPER_ADMIN;
            this.isAdmin
              ? this.profileForm.get('role').enable()
              : this.profileForm.get('role').disable();

            // this.appStoreService.setMe(user);
          },
          error: (err) => {
            this.notificationService.showToast({
              severity: MessageSeverity.ERROR,
              summary: this.translocoService.translate('PROFILE.TOAST.ERROR'),
              detail: this.translocoService.translate(
                'PROFILE.TOAST.MESSAGE_ERROR'
              ),
            });
          },
        });
    }
  }

  onSubmitUpdate() {
    // Crear una copia del valor del formulario
    const formValue = { ...this.profileForm.value };

    // Actualizar el campo 'role' con el valor del rol seleccionado
    formValue.role = this.profileForm.get('role').value.value;
    if (this.globalImageSrc) {
      formValue.photoUrl = this.globalImageSrc;
    }
    this.profileService
      .updateUser(this.userId, formValue, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.appStoreService.setMe(user);
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'PROFILE.SUBMIT.TOAST_UPDATE.ERROR'
            ),
            detail: error.error.message,
          });
        },
        complete: () => {
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: this.translocoService.translate(
              'PROFILE.SUBMIT.TOAST_UPDATE.SUCCESS'
            ),
          });
          this.ref.close();
        },
      });
  }

  onSubmitCreate() {
    // Crear una copia del valor del formulario
    const formValue = { ...this.profileForm.value };

    // Actualizar el campo 'role' con el valor del rol seleccionado
    formValue.role = this.profileForm.get('role').value.value;

    if (this.globalImageSrc) {
      formValue.photoUrl = this.globalImageSrc;
    }
    this.profileService
      .createUser(formValue, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.user = user;
          this.appStoreService.setMe(user);
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'PROFILE.SUBMIT.TOAST_CREATE.ERROR'
            ),
            detail: error.error.message,
          });
        },
        complete: () => {
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: this.translocoService.translate(
              'PROFILE.SUBMIT.TOAST_CREATE.SUCCESS'
            ),
            detail: 'Sign Up successful',
          });
          this.ref.close(this.user);
        },
      });
  }

  onCancel() {
    this.ref.close();
  }

  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.globalImageSrc = reader.result as string;
        this.profileForm.controls['photoUrl'].markAsDirty();
        if (this.user) {
          this.user.photoUrl = this.globalImageSrc;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
