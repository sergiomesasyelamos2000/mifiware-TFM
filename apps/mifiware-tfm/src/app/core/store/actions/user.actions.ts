import { createAction, props } from '@ngrx/store';
import { IUserState } from '@mifiware-tfm/entity-data-models';

export const setMe = createAction('[Me] Set Me', props<IUserState>());

export const resetMe = createAction('[Me] Reset Me');
