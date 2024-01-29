import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { AppStoreService } from '../../../core/services/app-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageSeverity } from '@mifiware-tfm/entity-data-models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'mifiware-tfm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userId!: string;
  token!: string;
  constructor(
    private profileService: ProfileService,
    private appStoreService: AppStoreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.appStoreService.loadAuth$().subscribe((auth) => {
      console.log('auth', auth);
      this.userId = auth.userId;
      this.token = auth.accessToken;
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

  show() {
    this.notificationService.showToast({
      severity: MessageSeverity.ERROR,
      summary: 'Sign Up',
      detail: 'error.error.message',
    });
  }
}
