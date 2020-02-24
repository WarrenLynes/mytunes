import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistsFacade } from '@tunes/core-state';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, filter, first, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'tunes-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  playlist$: any = this.facade.selectedPlaylist$;
  tracks$: Observable<any[]>;

  constructor(
    private facade: PlaylistsFacade,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      withLatestFrom(this.facade.selectedPlaylist$),
      // filter(([params, selected]) => params.has('id') && !selected.id || (params.get('id') !== selected.id)),
      first()
    ).subscribe(([frag]) => {
      this.facade.selectPlaylist(frag.get('id'));
    });

    this.tracks$ = this.playlist$.pipe(
      filter((x: any) => x && x.id),
      switchMap((x: any) => this.http.get(`/api/me/playlists/${x.id}/tracks`))
    );
  }

  ngOnDestroy(): void {
    this.facade.selectPlaylist(null);
  }

}
