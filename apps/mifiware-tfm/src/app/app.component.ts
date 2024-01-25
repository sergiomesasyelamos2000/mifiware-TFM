import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './core/services/app.layout.service';

@Component({
  selector: 'mifiware-tfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //hello$ = this.http.get<Message>('/api/hello');
  isInHomePath = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService
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

  ngOnInit(): void {
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
  }

  checkUrl(url: string) {
    this.isInHomePath = this.router.url === '/';
    console.log('this.isInHomePath', this.isInHomePath);
  }
}
