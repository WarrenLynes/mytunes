import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as playlistsActions from './playlists.actions';

export const PLAYLISTS_FEATURE_KEY = 'playlists';

export interface PlaylistsState extends EntityState<any> {
  selectedPlaylistId?: string | number;
  isLoading: boolean;
}

export interface PlaylistsPartialState {
  readonly [PLAYLISTS_FEATURE_KEY]: PlaylistsState;
}

export const playlistsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: PlaylistsState = playlistsAdapter.getInitialState({
  selectedPlaylistId: null,
  isLoading: false
});

const playlistsReducer = createReducer(
  initialState,
  on(playlistsActions.playlistSelected, (state, { selectedPlaylistId }) =>
    Object.assign({}, state, { selectedPlaylistId })
  ),
  on(playlistsActions.playlistsLoaded, (state, { playlists }) =>
    playlistsAdapter.addAll(playlists, { ...state, isLoading: false })
  ),
  on(playlistsActions.playlistCreated, (state, { playlist }) =>
    playlistsAdapter.addOne(playlist, { ...state, isLoading: false })
  ),
  on(playlistsActions.playlistUpdated, (state, { playlist }) =>
    playlistsAdapter.upsertOne(playlist, { ...state, isLoading: false })
  ),
  on(playlistsActions.playlistDeleted, (state, { playlist }) =>
    playlistsAdapter.removeOne(playlist.id, { ...state, isLoading: false })
  ),
  on(
    playlistsActions.loadPlaylists,
    playlistsActions.createPlaylist,
    playlistsActions.updatePlaylist,
    playlistsActions.deletePlaylist,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: PlaylistsState | undefined, action: Action) {
  return playlistsReducer(state, action);
}
