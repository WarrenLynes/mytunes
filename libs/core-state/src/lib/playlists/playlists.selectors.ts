import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PLAYLISTS_FEATURE_KEY,
  playlistsAdapter,
  PlaylistsState
} from './playlists.reducer';
import { emptyPlaylist } from '@tunes/core-data';

export const selectPlaylistsState =
  createFeatureSelector<PlaylistsState>(PLAYLISTS_FEATURE_KEY);

const { selectAll, selectEntities } = playlistsAdapter.getSelectors();

export const selectPlaylistsLoading = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.isLoading
);

export const selectAllPlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => selectAll(state)
);

export const selectPlaylistsEntities = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => selectEntities(state)
);

export const selectPlaylistId = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.selectedPlaylistId
);

export const selectCollaborativePlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => selectAll(state).filter((x) => x.collaborative)
);

export const selectPlaylist = createSelector(
  selectPlaylistsEntities,
  selectPlaylistId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyPlaylist
  }
);
