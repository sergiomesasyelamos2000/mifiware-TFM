/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStoreService } from '../../../core/services/app-store.service';
import { Subject, takeUntil } from 'rxjs';
import { LayoutService } from '../../../core/services/app.layout.service';
import { IUserState, User } from '@mifiware-tfm/entity-data-models';

@Component({
  selector: 'mifiware-tfm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  user!: IUserState;

  showLogin: boolean = false;
  constructor(
    private router: Router,
    private appStoreService: AppStoreService,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.showLogin = !!auth;
      });
    this.appStoreService
      .loadMe$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((me) => {
        this.user = me;
      });
  }

  goToLogin() {
    this.router.navigate(['auth', 'log-in']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
