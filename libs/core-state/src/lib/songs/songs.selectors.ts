import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SONGS_FEATURE_KEY,
  songsAdapter,
  SongsState
} from './songs.reducer';
import { emptySong } from '@tunes/core-data';

export const selectSongsState =
  createFeatureSelector<SongsState>(SONGS_FEATURE_KEY);

const { selectAll, selectEntities } = songsAdapter.getSelectors();

export const selectSongsLoading = createSelector(
  selectSongsState,
  (state: SongsState) => state.isLoading
);

export const selectAllSongs = createSelector(
  selectSongsState,
  (state: SongsState) => selectAll(state)
);

export const selectSongsEntities = createSelector(
  selectSongsState,
  (state: SongsState) => selectEntities(state)
);

export const selectSongId = createSelector(
  selectSongsState,
  (state: SongsState) => state.selectedSongId
);

export const selectSong = createSelector(
  selectSongsEntities,
  selectSongId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptySong
  }
);
