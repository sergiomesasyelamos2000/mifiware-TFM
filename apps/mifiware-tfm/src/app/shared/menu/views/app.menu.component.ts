import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../core/services/app.layout.service';
import { MenuItem } from 'primeng/api';
import { AppStoreService } from '../../../core/services/app-store.service';
import { Role } from '@mifiware-tfm/entity-data-models';
import { Subject, takeUntil } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'mifiware-tfm-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit, OnDestroy {
  model: MenuItem[] = [];
  isAdmin: boolean = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    public layoutService: LayoutService,
    private appStoreService: AppStoreService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.appStoreService
      .loadMe$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user.role === Role.SUPER_ADMIN) {
          this.isAdmin = true;
        }
      });
    this.model = [
      {
        label: 'MENU.HOME',
        items: [
          { label: 'MENU.HOME', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'MENU.MASTER.TITLE',
        items: [
          {
            label: 'MENU.MASTER.DASHBOARD',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/dashboard'],
          },
          {
            label: 'MENU.MASTER.PROFILE',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: ['/profile'],
          },
          {
            label: 'auth',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/auth/login'],
          },
        ],
      },
      {
        label: 'CRUD USERS',
        visible: this.isAdmin,
        items: [
          {
            label: 'MENU.MASTER.USERS',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/users'],
          },
        ],
      },
    ];
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
