import { IUserState } from '@mifiware-tfm/entity-data-models';
import { createReducer, on } from '@ngrx/store';

import * as coreActions from '../actions';

export const initialState: IUserState = {
  uuid: '',
  name: '',
  surname: '',
  email: '',
  role: null,
  photoUrl: '',
};

export const userReducer = createReducer(
  initialState,
  on(
    coreActions.setMe,
    (state, action): IUserState => ({
      ...state,
      ...action,
    })
  ),
  on(
    coreActions.resetMe,
    (state): IUserState => ({
      ...state,
      ...initialState,
    })
  )
);
