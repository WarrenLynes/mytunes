import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authenticated, IUser, loading } from './auth.reducer';
import { Credentials } from '@tunes/core-data';
import { Store } from '@ngrx/store';
import { authenticate as authenticateAction, authenticateSuccess, logout } from './auth.actions';
import { AppState } from '../index';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  get authenticated$(): Observable<boolean> {
    return this.store.select(authenticated);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<AppState>) {}


  authenticate() {
    this.store.dispatch(authenticateAction());
  }

  authenticateSuccess({access_token, refresh_token}) {
    this.store.dispatch((authenticateSuccess({access_token, refresh_token})))
  }


  logout() {
    this.store.dispatch(logout());
  }
}
