import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageSeverity, Role, User } from '@mifiware-tfm/entity-data-models';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Subject, of, switchMap, takeUntil } from 'rxjs';
import { AppStoreService } from '../../../core/services/app-store.service';
import { ProfileComponent } from '../../profile/views/profile.component';
import { UsersService } from '../users.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'mifiware-tfm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: any = {};

  selectedUsers: any[] = [];

  cols: any[] = [];

  roles: Role[] = [];

  rowsPerPageOptions = [5, 10, 20];

  destroy$: Subject<void> = new Subject<void>();
  token!: string;
  loading: boolean = true;

  constructor(
    private usersService: UsersService,
    private appStoreService: AppStoreService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private config: PrimeNGConfig,
    private notificationService: NotificationService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.translocoService
      .selectTranslateObject('TABLE')
      .pipe(takeUntil(this.destroy$))
      .subscribe((translations) => {
        this.config.setTranslation(translations);
      });
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.token = auth.accessToken;
      });
    if (this.token) {
      this.findAllUsers(this.token);
    }

    this.cols = [
      {
        field: 'name',
        header: this.translocoService.translate('USERS.HEADERS.NAME'),
        type: 'text',
      },
      {
        field: 'surname',
        header: this.translocoService.translate('USERS.HEADERS.SURNAME'),
        type: 'text',
      },
      {
        field: 'email',
        header: this.translocoService.translate('USERS.HEADERS.EMAIL'),
        type: 'text',
      },
      {
        field: 'role',
        header: this.translocoService.translate('USERS.HEADERS.ROLE'),
        type: 'role',
      },
    ];
  }

  getCurrentPageReportTemplate(): string {
    const showFrom = this.translocoService.translate(
      'USERS.LIST.PAGE_REPORT_SHOW_FROM'
    );
    const to = this.translocoService.translate('USERS.LIST.PAGE_REPORT_TO');
    const of = this.translocoService.translate('USERS.LIST.PAGE_REPORT_OF');
    const entries = this.translocoService.translate(
      'USERS.LIST.PAGE_REPORT_ENTRIES'
    );

    return `${showFrom} {first} ${to} {last} ${of} {totalRecords} ${entries}`;
  }

  getSeverity(status: string) {
    if (status === 'ADMIN') {
      return 'danger';
    } else if (status === 'USER') {
      return 'info';
    } else {
      return 'default';
    }
  }

  openNew() {
    this.ref = this.dialogService.open(ProfileComponent, {
      header: this.translocoService.translate('USERS.CREATE_USER.TITLE'),
      width: '70%',
      height: '67vh',
      styleClass: 'dialog',
      data: {
        isNew: true,
      },
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.findAllUsers(this.token);
      }
    });
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  editUser(user: User) {
    this.ref = this.dialogService.open(ProfileComponent, {
      header:
        this.translocoService.translate('USERS.EDIT_USER.TITLE') + user.name,
      width: '70%',
      height: '64vh',
      styleClass: 'dialog',
      data: {
        userId: user.uuid,
      },
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.findAllUsers(this.token);
      }
    });
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
    this.usersService
      .bulkDetele(this.selectedUsers, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'USERS.TOAST_DELETE.ERROR'
            ),
            detail: this.translocoService.translate(
              'USERS.TOAST_DELETE.MESSAGE_ERROR'
            ),
          });
        },
        complete: () => {
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: this.translocoService.translate(
              'USERS.TOAST_DELETE.SUCCESS'
            ),
          });
          this.findAllUsers(this.token);
        },
      });
    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;

    this.usersService
      .deleteUser(this.user.uuid, this.token)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          if (this.token) {
            return this.usersService.findAll(this.token);
          }
          // Si no hay token, devolvemos un observable que emite un valor vacío
          return of([]);
        })
      )
      .subscribe({
        next: (data: User[]) => {
          this.users = data;
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'USERS.TOAST_DELETE.ERROR'
            ),
            detail: this.translocoService.translate(
              'USERS.TOAST_DELETE.MESSAGE_ERROR'
            ),
          });
        },
        complete: () => {
          this.notificationService.showToast({
            severity: MessageSeverity.SUCCESS,
            summary: this.translocoService.translate(
              'USERS.TOAST_DELETE.SUCCESS'
            ),
          });
        },
      });
  }

  findAllUsers(token: string) {
    this.usersService
      .findAll(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: User[]) => {
          this.users = data;
          this.loading = false;
          this.roles = this.users
            .map((user) => user.role)
            .filter((role, index, self) => self.indexOf(role) === index);
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate('USERS.TOAST_FIND.ERROR'),
            detail: this.translocoService.translate(
              'USERS.TOAST_FIND.MESSAGE_ERROR'
            ),
          });
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.ref) {
      this.ref.close();
    }
  }

  /*
  En caso de necesitar paginación, se puede utilizar el siguiente método. En html usar:
        [lazy]="true"
        (onLazyLoad)="loadUsers($event)"
        [loading]="loading"
        [totalRecords]="totalRecords"
   */

  /* loadUsers(event: LazyLoadEvent) {
    this.loading = true;

    this.usersService
      .findAll(this.token, event.first, event.rows)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: { data: User[]; total: number }) => {
        this.users = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      });
  } */
}
