import { createAction, props } from '@ngrx/store';
import { IAuthState } from '@mifiware-tfm/entity-data-models';

export const setAuth = createAction('[Auth] Set Auth', props<IAuthState>());

export const resetAuth = createAction('[Auth] Reset Auth');
