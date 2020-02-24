import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@tunes/core-data';
import { AppState } from '../index';
import {
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from './auth.actions';
import { IUser } from './auth.reducer';
import { SnackbarService } from '@tunes/core-data';
import { AppFacade } from '../app/app.facade';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private appFacade: AppFacade,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute
  ) {}

  authenticate$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticate),
      delay(1000),
      tap(() => { this.service.authenticate(); })
      /*switchMap(({type, credentials}) => {
        return this.service.authenticate(credentials).pipe(
          map(({access_token}) => {
            localStorage.setItem('TOKEN', access_token);
            return authenticateSuccess({token: access_token});
          }),
          catchError(error => of(authenticateFailure({error})))
        )
      })*/
    )
  , {dispatch: false});

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap((type) => {
        this.appFacade.addLoad('[LOGOUT]');
        this.snackbarService.openSnackBar('adios!', 500)
      }),
      delay(1000),
      switchMap(() => {
        return this.service.logout().pipe(
          map((user: IUser) => logoutSuccess()),
          tap(() => this.snackbarService.openSnackBar('Logout Success')),
          catchError(error => of(logoutFailure()))
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        this.appFacade.removeLoad('[LOGOUT]');
        this.router.navigateByUrl('/');
      })
    )
  , {dispatch: false});

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(({access_token, refresh_token}) => {

        localStorage.setItem('ACCESS_TOKEN', access_token);
        localStorage.setItem('REFRESH_TOKEN', refresh_token);

        if(this.route.snapshot.queryParams['returnUrl']) {
          this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'])
        } else {
          this.router.navigateByUrl('');
        }
      })
    )
  , {dispatch: false});
}
