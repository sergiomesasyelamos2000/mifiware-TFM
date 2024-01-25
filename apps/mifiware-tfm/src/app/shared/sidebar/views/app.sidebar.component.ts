import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'mifiware-tfm-sidebar',
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) {}
}
