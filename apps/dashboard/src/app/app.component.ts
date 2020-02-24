import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade, PlaylistsFacade, SongsFacade } from '@tunes/core-state';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tunes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  loading: boolean;

  links = [
    {path: '', title: 'songs', icon: 'access_time'},
    {path: 'playlists', title: 'playlists', icon: 'menu'},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private songsFacade: SongsFacade,
    private playlistsFacade: PlaylistsFacade
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();
    this.songsFacade.loadSongs();
    this.playlistsFacade.loadPlaylists();

    this.appFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      if (x !== this.loading) {
        this.loading = x;
        this.cdRef.detectChanges()
      }
    });
    this.route.fragment.pipe(
      withLatestFrom(this.authFacade.authenticated$),
      filter(([x, xx]) => x && x.indexOf('access_token') > -1 && !xx),
    ).subscribe(([x, xx]) => {
      const query = {
        access_token: null,
        refresh_token: null
      };

      x.split('&').forEach((c) => {
        if (c.indexOf('access_token') > -1) {
          query['access_token'] = c.split('=')[1]
        } else if (c.indexOf('refresh_token') > -1) {
          query['refresh_token'] = c.split('=')[1]
        }
      });

      this.authFacade.authenticateSuccess(query);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.authFacade.logout();
  }

  onAuthenticate() {
    this.authFacade.authenticate();
    window.location.replace('http://localhost:3333/login')
  }

}
