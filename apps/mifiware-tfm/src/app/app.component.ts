import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'mifiware-tfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //hello$ = this.http.get<Message>('/api/hello');
  isInHomePath = false;
  constructor(private http: HttpClient, private router: Router) {
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

  checkUrl(url: string) {
    this.isInHomePath = this.router.url === '/';
    console.log('this.isInHomePath', this.isInHomePath);
  }
}
