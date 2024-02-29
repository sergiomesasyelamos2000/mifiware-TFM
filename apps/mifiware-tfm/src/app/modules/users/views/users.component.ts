import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@mifiware-tfm/entity-data-models';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Subject, of, switchMap, takeUntil } from 'rxjs';
import { AppStoreService } from '../../../core/services/app-store.service';
import { ProfileComponent } from '../../profile/views/profile.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'mifiware-tfm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService],
})
export class UsersComponent implements OnInit, OnDestroy {
  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: any = {};

  selectedUsers: any[] = [];

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  destroy$: Subject<void> = new Subject<void>();
  token!: string;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private appStoreService: AppStoreService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit() {
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
      { field: 'name', header: 'Name' },
      { field: 'surname', header: 'Surname' },
      { field: 'email', header: 'email' },
      { field: 'role', header: 'Role' },
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
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
      header: 'Select a User',
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
      header: 'Editar usuario: ' + user.name,
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
        error: (error) => {},
        complete: () => {
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
            life: 3000,
          });
        },
      });
  }

  findAllUsers(token: string) {
    this.usersService
      .findAll(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.ref) {
      this.ref.close();
    }
  }
}
