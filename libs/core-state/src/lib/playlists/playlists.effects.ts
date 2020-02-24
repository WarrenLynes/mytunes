import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { PlaylistsFacade } from './playlists.facade';
import * as playlistsActions from './playlists.actions';
import { Playlist, PlaylistsService, SnackbarService } from '@tunes/core-data';
import { PlaylistsPartialState } from './playlists.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class PlaylistsEffects {
  loadPlaylists$ = createEffect(() =>
    this.dataPersistence.fetch(playlistsActions.loadPlaylists, {
      run: (
        action: ReturnType<typeof playlistsActions.loadPlaylists>,
        state: PlaylistsPartialState
      ) => {
        this.appFacade.addLoad('[PLAYLIST][LOAD]');
        return this.playlistsService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Playlists')),
          map((playlists: any) => playlistsActions.playlistsLoaded({ playlists})),
          tap(() => this.appFacade.removeLoad('[PLAYLIST][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof playlistsActions.loadPlaylists>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addPlaylist$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(playlistsActions.createPlaylist, {
      run: (
        action: ReturnType<typeof playlistsActions.createPlaylist>,
        state: PlaylistsPartialState
      ) => {
        this.appFacade.addLoad('[PLAYLIST][CREATE]');

        return this.playlistsService.create(action.playlist).pipe(
          map((playlist: Playlist) => playlistsActions.playlistCreated({ playlist })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Playlist')),
          tap(() => this.appFacade.removeLoad('[PLAYLIST][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof playlistsActions.createPlaylist>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updatePlaylist$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(playlistsActions.updatePlaylist, {
      run: (
        action: ReturnType<typeof playlistsActions.updatePlaylist>,
        state: PlaylistsPartialState
      ) => {
        this.appFacade.addLoad('[PLAYLIST][UPDATE]');

        return this.playlistsService.update(action.playlist).pipe(
          map((playlist: Playlist) => playlistsActions.playlistUpdated({ playlist })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Playlist')),
          tap(() => this.appFacade.removeLoad('[PLAYLIST][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof playlistsActions.updatePlaylist>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deletePlaylist$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(playlistsActions.deletePlaylist, {
      run: (
        action: ReturnType<typeof playlistsActions.deletePlaylist>,
        state: PlaylistsPartialState
      ) => {
        this.appFacade.addLoad('[PLAYLIST][DELETE]');
        return this.playlistsService.delete(action.playlist.id).pipe(
          map((playlist: Playlist) => playlistsActions.playlistDeleted({ playlist })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Playlist')),
          tap(() => this.playlistsFacade.loadPlaylists()),
          tap(() => this.appFacade.removeLoad('[PLAYLIST][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof playlistsActions.deletePlaylist>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PlaylistsPartialState>,
    private playlistsService: PlaylistsService,
    private playlistsFacade: PlaylistsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
