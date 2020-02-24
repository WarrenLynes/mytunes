import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { SongsFacade } from './songs.facade';
import * as songsActions from './songs.actions';
import { Song, SongsService, SnackbarService } from '@tunes/core-data';
import { SongsPartialState } from './songs.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class SongsEffects {
  loadSongs$ = createEffect(() =>
    this.dataPersistence.fetch(songsActions.loadSongs, {
      run: (
        action: ReturnType<typeof songsActions.loadSongs>,
        state: SongsPartialState
      ) => {
        this.appFacade.addLoad('[SONGS][LOAD]');
        return this.songsService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Songs')),
          map((songs: any) => songsActions.songsLoaded({ songs: songs})),
          tap(() => this.appFacade.removeLoad('[SONGS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof songsActions.loadSongs>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addSong$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(songsActions.createSong, {
      run: (
        action: ReturnType<typeof songsActions.createSong>,
        state: SongsPartialState
      ) => {
        this.appFacade.addLoad('[SONGS][CREATE]');

        return this.songsService.create(action.song).pipe(
          map((song: Song) => songsActions.songCreated({ song })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Song')),
          tap(() => this.appFacade.removeLoad('[SONGS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof songsActions.createSong>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateSong$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(songsActions.updateSong, {
      run: (
        action: ReturnType<typeof songsActions.updateSong>,
        state: SongsPartialState
      ) => {
        this.appFacade.addLoad('[SONGS][UPDATE]');

        return this.songsService.update(action.song).pipe(
          map((song: Song) => songsActions.songUpdated({ song })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Song')),
          tap(() => this.appFacade.removeLoad('[SONGS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof songsActions.updateSong>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteSong$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(songsActions.deleteSong, {
      run: (
        action: ReturnType<typeof songsActions.deleteSong>,
        state: SongsPartialState
      ) => {
        this.appFacade.addLoad('[SONGS][DELETE]');
        return this.songsService.delete(action.song.id).pipe(
          map((song: Song) => songsActions.songDeleted({ song })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Song')),
          tap(() => this.songsFacade.loadSongs()),
          tap(() => this.appFacade.removeLoad('[SONGS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof songsActions.deleteSong>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SongsPartialState>,
    private songsService: SongsService,
    private songsFacade: SongsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
