import { createAction, props } from '@ngrx/store';

import { Playlist } from '@tunes/core-data';

export const playlistSelected = createAction(
  '[PLAYLIST][SELECTED]',
  props<{ selectedPlaylistId: string }>()
);
export const loadPlaylists = createAction(
  '[PLAYLIST][LOAD]'
);
export const playlistsLoaded = createAction(
  '[PLAYLIST][LOADED]',
  props<{ playlists: any[] }>()
);
export const createPlaylist = createAction(
  '[PLAYLIST][CREATE]',
  props<{ playlist: any }>()
);
export const playlistCreated = createAction(
  '[PLAYLIST][CREATED]',
  props<{ playlist: any }>()
);
export const updatePlaylist = createAction(
  '[PLAYLIST][UPDATE]',
  props<{ playlist: any }>()
);
export const playlistUpdated = createAction(
  '[PLAYLIST][UPDATED]',
  props<{ playlist: any }>()
);
export const deletePlaylist = createAction(
  '[PLAYLIST][DELETE]',
  props<{ playlist: any }>()
);
export const playlistDeleted = createAction(
  '[PLAYLIST][DELETED]',
  props<{ playlist: any }>()
);
