import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isInitialized, isLoading } from './app.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../';
import { addLoad, appInit, removeLoad } from './app.actions';
import { authenticate, authenticateSuccess } from '../auth/auth.actions';

@Injectable({providedIn: 'root'})
export class AppFacade {

  get initialized$(): Observable<boolean> {
    return this.store.select(isInitialized);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(isLoading);
  }

  constructor(
    private store: Store<AppState>
  ) {}

  initialize() {
    this.store.dispatch(appInit());
    const access_token = localStorage.getItem('ACCESS_TOKEN');
    const refresh_token = localStorage.getItem('REFRESH_TOKEN');
    if(access_token && refresh_token)
      this.store.dispatch(authenticateSuccess({access_token, refresh_token}))
  }

  addLoad(loadId: string) {
    this.store.dispatch(addLoad({loadId}));
  }

  removeLoad(loadId: string) {
    this.store.dispatch(removeLoad({loadId}));
  }
}
