import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as songsActions from './songs.actions';
import { Song } from '@tunes/core-data';

export const SONGS_FEATURE_KEY = 'songs';

export interface SongsState extends EntityState<Song> {
  selectedSongId?: string | number;
  isLoading: boolean;
}

export interface SongsPartialState {
  readonly [SONGS_FEATURE_KEY]: SongsState;
}

export const songsAdapter: EntityAdapter<Song> = createEntityAdapter<Song>();

export const initialState: SongsState = songsAdapter.getInitialState({
  selectedSongId: null,
  isLoading: false
});

const songsReducer = createReducer(
  initialState,
  on(songsActions.songSelected, (state, { selectedSongId }) =>
    Object.assign({}, state, { selectedSongId })
  ),
  on(songsActions.songsLoaded, (state, { songs }) =>
    songsAdapter.addAll(songs, { ...state, isLoading: false })
  ),
  on(songsActions.songCreated, (state, { song }) =>
    songsAdapter.addOne(song, { ...state, isLoading: false })
  ),
  on(songsActions.songUpdated, (state, { song }) =>
    songsAdapter.upsertOne(song, { ...state, isLoading: false })
  ),
  on(songsActions.songDeleted, (state, { song }) =>
    songsAdapter.removeOne(song.id, { ...state, isLoading: false })
  ),
  on(
    songsActions.loadSongs,
    songsActions.createSong,
    songsActions.updateSong,
    songsActions.deleteSong,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: SongsState | undefined, action: Action) {
  return songsReducer(state, action);
}
