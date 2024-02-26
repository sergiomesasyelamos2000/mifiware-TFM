import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'mifiware-tfm-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'MyDashBoard',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/dashboard'],
          },
          {
            label: 'PROFILE',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/profile'],
          },
          {
            label: 'auth',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/auth/login'],
          },
        ],
      },
    ];
  }
}
