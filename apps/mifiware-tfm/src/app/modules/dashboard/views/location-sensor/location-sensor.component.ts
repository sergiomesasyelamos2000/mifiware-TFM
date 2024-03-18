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
  selector: 'mifiware-tfm-location-sensor',
  templateUrl: './location-sensor.component.html',
  styleUrls: ['./location-sensor.component.scss'],
})
export class LocationSensorComponent implements OnInit {
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
