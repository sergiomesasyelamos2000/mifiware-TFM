import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { AppFooterComponent } from '../../../shared/footer/views/app.footer.component';
import { AppMenuComponent } from '../../../shared/menu/views/app.menu.component';
import { AppMenuitemComponent } from '../../../shared/menu/views/app.menuitem.component';
import { AppSidebarComponent } from '../../../shared/sidebar/views/app.sidebar.component';
import { AppTopBarComponent } from '../../../shared/topbar/views/app.topbar.component';
import { AppLayoutComponent } from './app.layout.component';
import { AppConfigModule } from './config/config.module';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    OverlayPanelModule,
    ListboxModule,
    AppConfigModule,
    TranslocoModule,
  ],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
