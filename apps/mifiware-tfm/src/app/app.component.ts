import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './core/services/app.layout.service';
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
    private http: HttpClient,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService,
    private appStoreService: AppStoreService
  ) {
    this.router.events.subscribe((event) => {
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
    });
  }

  /* ngOnInit(): void {
    this.primengConfig.ripple = true; //enables core ripple functionality
    document.documentElement.style.fontSize = '14px';

    //optional configuration with the default configuration
    this.layoutService.config = {
      ripple: false, //toggles ripple on and off
      inputStyle: 'outlined', //default style for input elements
      menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light', //color scheme of the template, valid values are "light" and "dark"
      //theme: 'lara-light-indigo',         //default component theme for PrimeNG
      theme: 'mdc-light-deeppurple', //default component theme for PrimeNG

      scale: 14, //size of the body font size to scale the whole application
    };
  } */
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
