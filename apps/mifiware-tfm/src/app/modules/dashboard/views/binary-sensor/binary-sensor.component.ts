import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { TranslocoService } from '@ngneat/transloco';
import { AppStoreService } from 'apps/mifiware-tfm/src/app/core/services/app-store.service';
import { LayoutService } from 'apps/mifiware-tfm/src/app/core/services/app.layout.service';
import { NotificationService } from 'apps/mifiware-tfm/src/app/core/services/notification.service';
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
      .getGrafanaDashboardUrlBinary(userId, this.token)
      .subscribe({
        next: (grafanaUrlBinary) => {
          this.grafanaUrlBinary =
            this.domSanitizer.bypassSecurityTrustResourceUrl(grafanaUrlBinary);
        },
        error: (error) => {
          this.notificationService.showToast({
            severity: MessageSeverity.ERROR,
            summary: this.translocoService.translate(
              'DASHBOARD.BINARY.TOAST.ERROR'
            ),
            detail: this.translocoService.translate(
              'DASHBOARD.BINARY.TOAST.MESSAGE_ERROR'
            ),
          });
        },
      });
  }
}
