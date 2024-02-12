import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { AppStoreService } from '../../../core/services/app-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'mifiware-tfm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected userId!: string;
  protected token!: string;
  protected grafanaUrl!: SafeResourceUrl;

  constructor(
    private profileService: ProfileService,
    private appStoreService: AppStoreService,
    private notificationService: NotificationService,
    private dashboardService: DashboardService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.appStoreService.loadAuth$().subscribe((auth) => {
      console.log('auth', auth);
      this.userId = auth.userId;
      this.token = auth.accessToken;
      this.getGrafanaDashboardUrl();
    });

    /* this.profileService.getProfile(this.userId, this.token).subscribe({
      next: (res) => {
        this.appStoreService.setMe(res);
        this.notificationService.showToast({
          severity: MessageSeverity.SUCCESS,
          summary: 'Login',
          detail: 'Login successful',
        });
      },
      error: (error) => {
        console.log('error', error);
      },
    }); */
  }

  getGrafanaDashboardUrl(): void {
    const userId = 'A';
    this.dashboardService
      .getGrafanaDashboardUrl(userId, this.token)
      .subscribe((grafanaUrl) => {
        this.grafanaUrl =
          this.domSanitizer.bypassSecurityTrustResourceUrl(grafanaUrl);
      });
  }

  show() {
    this.notificationService.showToast({
      severity: MessageSeverity.ERROR,
      summary: 'Sign Up',
      detail: 'error.error.message',
    });
  }
}
