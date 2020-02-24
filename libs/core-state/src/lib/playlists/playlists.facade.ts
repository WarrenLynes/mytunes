import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromPlaylists from './playlists.reducer';
import * as playlistsActions from './playlists.actions';
import {
  selectAllPlaylists,
  selectPlaylist,
  selectPlaylistsLoading,
  selectCollaborativePlaylists
} from './playlists.selectors';
import { Playlist } from '@tunes/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlaylistsFacade {
  allPlaylists$ = this.store.pipe(select(selectAllPlaylists));
  allCollaborativePlaylists$ = this.store.pipe(select(selectCollaborativePlaylists));
  selectedPlaylist$ = this.store.pipe(select(selectPlaylist));
  playlistLoading$ = this.store.pipe(select(selectPlaylistsLoading));

  constructor(
    private store: Store<fromPlaylists.PlaylistsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectPlaylist(selectedPlaylistId: any) {
    this.dispatch(playlistsActions.playlistSelected({ selectedPlaylistId }));
  }

  loadPlaylists() {
    this.dispatch(playlistsActions.loadPlaylists());
  }

  createPlaylist(playlist: any) {
    this.dispatch(playlistsActions.createPlaylist({ playlist }));
  }

  updatePlaylist(playlist: any) {
    this.dispatch(playlistsActions.updatePlaylist({ playlist }));
  }

  deletePlaylist(playlist: any) {
    this.dispatch(playlistsActions.deletePlaylist({ playlist }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
