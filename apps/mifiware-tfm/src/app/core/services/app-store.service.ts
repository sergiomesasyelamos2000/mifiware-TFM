import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState, getAuth, getMe, setAuth, setMe } from '../store';
import { IAuthState, IUserState } from '@mifiware-tfm/entity-data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  constructor(private appStore: Store<CoreState>) {}

  loadAuth$(): Observable<IAuthState | null> {
    return this.appStore.select(getAuth);
  }

  setAuth(auth: IAuthState | null) {
    this.appStore.dispatch(setAuth(auth));
  }

  loadMe$(): Observable<IUserState | null> {
    return this.appStore.select(getMe);
  }

  setMe(me: IUserState | null) {
    this.appStore.dispatch(setMe(me));
  }
}
