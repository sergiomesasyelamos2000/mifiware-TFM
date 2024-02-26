import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AppStoreService } from './core/services/app-store.service';

@Component({
  selector: 'mifiware-tfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticate = false;
  isInHomePath = false;
  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private appStoreService: AppStoreService
  ) {
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUrl(event.url);
      }
      if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          const url = this.router.url;
          if (url) {
            this.checkUrl(url);
          }
        }, 1000);
      }
    }); */
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
  }

  checkUrl(url: string) {
    this.isInHomePath = this.router.url === '/';
    this.appStoreService.loadAuth$().subscribe((auth) => {
      this.isAuthenticate = !!auth.accessToken;
    });
    console.log('this.isInHomePath', this.isInHomePath, this.isAuthenticate);
  }
}
