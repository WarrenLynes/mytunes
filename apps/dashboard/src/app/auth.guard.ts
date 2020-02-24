import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthFacade } from '@tunes/core-state';
import { first, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private facade: AuthFacade) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {
    const baseUrl = state.url.split('#')[0];
    const queryParams = baseUrl.length > 1 ?  { returnUrl: baseUrl } : null;

    console.log(state.url);

    if(route.fragment && route.fragment.indexOf('access_token') > -1) {
      const query = {
        access_token: null,
        refresh_token: null
      };

      route.fragment.split('&').forEach((c) => {
        if (c.indexOf('access_token') > -1) {
          query['access_token'] = c.split('=')[1]
        } else if (c.indexOf('refresh_token') > -1) {
          query['refresh_token'] = c.split('=')[1]
        }
      });

      this.facade.authenticateSuccess(query)
    }

    return this.facade.authenticated$.pipe(
      takeUntil(this.destroy$), first(),
      map(x => {
        if(x) {
          return true;
        } else {
          this.router.navigate(['/home'], { queryParams });
          return false;
        }
      })
    );
  }
}
