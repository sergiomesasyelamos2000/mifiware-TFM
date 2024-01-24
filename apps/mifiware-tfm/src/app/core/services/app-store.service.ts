import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState, getMe, setMe } from '../store';
import { IAuthState } from '@mifiware-tfm/entity-data-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  constructor(private appStore: Store<CoreState>) {}

  loadMe$(): Observable<IAuthState | null> {
    return this.appStore.select(getMe);
  }

  setMe(me: IAuthState | null) {
    this.appStore.dispatch(setMe(me));
  }
}
