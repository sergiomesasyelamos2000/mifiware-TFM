/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStoreService } from '../../../core/services/app-store.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mifiware-tfm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  showLogin: boolean = false;
  constructor(
    private router: Router,
    private appStoreService: AppStoreService
  ) {}

  ngOnInit(): void {
    this.appStoreService
      .loadAuth$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.showLogin = !!auth;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
