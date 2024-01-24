import { IAuthState } from '@mifiware-tfm/entity-data-models';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface CoreState {
  auth: IAuthState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: fromAuth.authReducer,
};

export const getCoreState = createFeatureSelector<CoreState>('core');
