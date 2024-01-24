import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app.layout.component';
import { AppSidebarComponent } from '../../sidebar/views/app.sidebar.component';
import { AppFooterComponent } from '../../footer/views/app.footer.component';
import { AppTopBarComponent } from '../../topbar/views/app.topbar.component';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from '../../menu/app.menuitem.component';
import { AppMenuComponent } from '../../menu/app.menu.component';

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
    CommonModule,
  ],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
