import { IAuthState, IUserState } from '@mifiware-tfm/entity-data-models';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';

export interface CoreState {
  auth: IAuthState;
  user: IUserState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
};

export const getCoreState = createFeatureSelector<CoreState>('core');
