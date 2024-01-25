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
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from '../../../shared/footer/views/app.footer.component';
import { AppMenuComponent } from '../../../shared/menu/views/app.menu.component';
import { AppMenuitemComponent } from '../../../shared/menu/views/app.menuitem.component';
import { AppSidebarComponent } from '../../../shared/sidebar/views/app.sidebar.component';
import { AppTopBarComponent } from '../../../shared/topbar/views/app.topbar.component';

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
