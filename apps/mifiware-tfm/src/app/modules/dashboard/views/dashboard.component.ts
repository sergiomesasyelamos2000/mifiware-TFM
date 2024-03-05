import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { AppStoreService } from '../../../core/services/app-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'mifiware-tfm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected userId!: string;
  protected token!: string;
  protected grafanaUrlBinary!: SafeResourceUrl;
  protected grafanaUrlLocation!: SafeResourceUrl;
  constructor(
    private profileService: ProfileService,
    private appStoreService: AppStoreService,
    private notificationService: NotificationService,
    private dashboardService: DashboardService,
    private domSanitizer: DomSanitizer,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.appStoreService.loadAuth$().subscribe((auth) => {
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

  ngAfterViewInit() {
    window.addEventListener('blur', (e) => {
      setTimeout(() => {
        window.focus();
      }, 0);
    });
  }

  getGrafanaDashboardUrl(): void {
    const userId = 'A';
    this.dashboardService
      .getGrafanaDashboardUrlUsers(userId, this.token)
      .subscribe((grafanaUrlBinary) => {
        this.grafanaUrlBinary =
          this.domSanitizer.bypassSecurityTrustResourceUrl(grafanaUrlBinary);
      });

    this.dashboardService
      .getGrafanaDashboardUrlLocation(userId, this.token)
      .subscribe((grafanaUrlLocation) => {
        this.grafanaUrlLocation =
          this.domSanitizer.bypassSecurityTrustResourceUrl(grafanaUrlLocation);
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
