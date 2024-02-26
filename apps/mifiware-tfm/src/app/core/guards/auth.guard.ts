import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppStoreService } from '../services/app-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  accessToken!: string;
  constructor(
    private router: Router,
    private appStoreService: AppStoreService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.appStoreService.loadAuth$().subscribe((auth) => {
      this.accessToken = auth.accessToken;
    });

    if (this.accessToken) {
      return true;
    } else {
      this.router.navigate(['access']);
      return false;
    }
  }
}
