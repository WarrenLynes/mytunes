import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromSongs from './songs.reducer';
import * as songsActions from './songs.actions';
import {
  selectAllSongs,
  selectSong,
  selectSongsLoading
} from './songs.selectors';
import { Song } from '@tunes/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SongsFacade {
  allSongs$ = this.store.pipe(select(selectAllSongs));
  selectedSong$ = this.store.pipe(select(selectSong));
  songLoading$ = this.store.pipe(select(selectSongsLoading));

  constructor(
    private store: Store<fromSongs.SongsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectSong(selectedSongId: any) {
    this.dispatch(songsActions.songSelected({ selectedSongId }));
  }

  loadSongs() {
    this.dispatch(songsActions.loadSongs());
  }

  createSong(song: Song) {
    this.dispatch(songsActions.createSong({ song }));
  }

  updateSong(song: Song) {
    this.dispatch(songsActions.updateSong({ song }));
  }

  deleteSong(song: Song) {
    this.dispatch(songsActions.deleteSong({ song }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
