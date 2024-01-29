import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getMe = createSelector(
  fromFeature.getCoreState,
  (state) => state.user
);
