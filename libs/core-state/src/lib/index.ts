import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromSongs from './songs/songs.reducer';
import * as fromPlaylists from './playlists/playlists.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  songs: fromSongs.SongsState;
  playlists: fromPlaylists.PlaylistsState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  songs: fromSongs.reducer,
  playlists: fromPlaylists.reducer
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  songs: {ids: [] } as fromSongs.SongsState,
  playlists: {ids: [] } as fromPlaylists.PlaylistsState
};
