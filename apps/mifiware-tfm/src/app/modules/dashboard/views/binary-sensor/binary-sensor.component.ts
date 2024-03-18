import { Component, OnInit } from '@angular/core';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppStoreService } from 'apps/mifiware-tfm/src/app/core/services/app-store.service';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { NotificationService } from 'apps/mifiware-tfm/src/app/core/services/notification.service';
import { ProfileService } from '../../../profile/profile.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'mifiware-tfm-binary-sensor',
  templateUrl: './binary-sensor.component.html',
  styleUrls: ['./binary-sensor.component.scss'],
})
export class BinarySensorComponent implements OnInit {
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
      .getGrafanaDashboardUrlBinary(userId, this.token)
      .subscribe((grafanaUrlBinary) => {
        this.grafanaUrlBinary =
          this.domSanitizer.bypassSecurityTrustResourceUrl(grafanaUrlBinary);
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
