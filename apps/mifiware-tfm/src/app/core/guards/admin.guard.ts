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
import { Role } from '@mifiware-tfm/entity-data-models';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  isAdmin!: string;
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
    this.appStoreService.loadMe$().subscribe((user) => {
      this.isAdmin = user.role;
    });

    if (this.isAdmin === Role.SUPER_ADMIN) {
      return true;
    } else {
      return false;
    }
  }
}
