import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { TranslocoService } from '@ngneat/transloco';
import { AppStoreService } from 'apps/mifiware-tfm/src/app/core/services/app-store.service';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { NotificationService } from 'apps/mifiware-tfm/src/app/core/services/notification.service';
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
    private appStoreService: AppStoreService,
    private notificationService: NotificationService,
    private dashboardService: DashboardService,
    private domSanitizer: DomSanitizer,
    public layoutService: LayoutService,
    private translocoService: TranslocoService
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
      .subscribe({
        next: (grafanaUrlLocation) => {
          this.grafanaUrlLocation =
            this.domSanitizer.bypassSecurityTrustResourceUrl(
              grafanaUrlLocation
            );
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'DASHBOARD.LOCATION.TOAST.ERROR'
            ),
            detail: this.translocoService.translate(
              'DASHBOARD.LOCATION.TOAST.MESSAGE_ERROR'
            ),
          });
        },
      });
  }
}
