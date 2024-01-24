import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
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
    this.appStoreService.loadMe$().subscribe((me) => {
      this.accessToken = me.accessToken;
    });
    console.log('this.accessToken', this.accessToken);

    if (this.accessToken) {
      return true;
    } else {
      return false;
    }
  }
}

/* export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['auth', 'login']);
  }
}; */
