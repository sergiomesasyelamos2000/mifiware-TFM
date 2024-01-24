import { createAction, props } from '@ngrx/store';
import { IAuthState } from '@mifiware-tfm/entity-data-models';

export const setMe = createAction('[Me] Set Me', props<IAuthState>());

export const resetMe = createAction('[Me] Reset Me');
