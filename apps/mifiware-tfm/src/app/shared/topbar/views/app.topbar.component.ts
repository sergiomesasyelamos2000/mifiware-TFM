import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppStoreService } from '../../../core/services/app-store.service';
import { LayoutService } from '../../../core/services/app.layout.service';
import { TranslocoService } from '@ngneat/transloco';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LANGUAGES_ENUM } from '@mifiware-tfm/entity-data-models';

@Component({
  selector: 'mifiware-tfm-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopBarComponent {
  isDarkTheme = false;
  languages = Object.keys(LANGUAGES_ENUM);
  selectedLanguage: any;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  @ViewChild('op') op: OverlayPanel;

  constructor(
    public layoutService: LayoutService,
    private appStoreService: AppStoreService,
    public router: Router,
    private translocoService: TranslocoService
  ) {
    this.selectedLanguage = this.languages[0];
  }

  changeColor() {
    if (this.isDarkTheme) {
      this.changeTheme('lara-light-indigo', 'light');
    } else {
      this.changeTheme('lara-dark-indigo', 'dark');
    }
    this.isDarkTheme = !this.isDarkTheme;
  }

  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink
      .getAttribute('href')!
      .replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  logout() {
    this.appStoreService.resetMe();
    this.appStoreService.resetAuth();
    this.router.navigate(['auth', 'login']);
  }

  changeLanguage(lang?: string) {
    console.log('changeLanguage', lang);

    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.op.hide();
  }
}
