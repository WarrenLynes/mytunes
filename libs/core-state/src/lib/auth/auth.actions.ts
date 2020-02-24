import { createAction, props } from '@ngrx/store';
import { IUser } from './auth.reducer';
import { Credentials } from '@tunes/core-data';

export const authenticate = createAction(
  '[AUTH][AUTHENTICATE][REQUEST]'
);

export const authenticateSuccess = createAction(
  '[AUTH][AUTHENTICATE][SUCCESS]',
  props<{ access_token: any, refresh_token: any }>()
);

export const authenticateFailure = createAction(
  '[AUTH][AUTHENTICATE][FAILURE]',
  props<{ error: any }>()
);

export const logout = createAction( '[AUTH][LOGOUT]' );
export const logoutFailure = createAction( '[AUTH][LOGOUT][FAILURE]' );
export const logoutSuccess = createAction( '[AUTH][LOGOUT][SUCCESS]' );
export const reset = createAction( '[AUTH][RESET]' );
