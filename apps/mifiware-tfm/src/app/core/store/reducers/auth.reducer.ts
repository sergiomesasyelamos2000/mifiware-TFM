import { IAuthState } from '@mifiware-tfm/entity-data-models';
import { createReducer, on } from '@ngrx/store';
import * as coreActions from '../actions';

export const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  tokenType: '',
  userId: '',
};

export const authReducer = createReducer(
  initialState,
  on(
    coreActions.setAuth,
    (state, action): IAuthState => ({
      ...state,
      ...action,
    })
  ),
  on(
    coreActions.resetAuth,
    (state): IAuthState => ({
      ...state,
      ...initialState,
    })
  )
);
