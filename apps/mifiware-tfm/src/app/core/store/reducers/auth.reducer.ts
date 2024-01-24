import { IAuthState } from '@mifiware-tfm/entity-data-models';
import { createReducer, on } from '@ngrx/store';
import * as coreActions from '../actions';

export const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  tokenType: '',
  name: '',
  surname: '',
  email: '',
  role: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    coreActions.setMe,
    (state, action): IAuthState => ({
      ...state,
      ...action,
    })
  ),
  on(
    coreActions.resetMe,
    (state): IAuthState => ({
      ...state,
      ...initialState,
    })
  )
);
