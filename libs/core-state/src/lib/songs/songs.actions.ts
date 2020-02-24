import { createAction, props } from '@ngrx/store';

import { Song } from '@tunes/core-data';

export const songSelected = createAction(
  '[SONG][SELECTED]',
  props<{ selectedSongId: string }>()
);
export const loadSongs = createAction(
  '[SONG][LOAD]'
);
export const songsLoaded = createAction(
  '[SONG][LOADED]',
  props<{ songs: Song[] }>()
);
export const createSong = createAction(
  '[SONG][CREATE]',
  props<{ song: Song }>()
);
export const songCreated = createAction(
  '[SONG][CREATED]',
  props<{ song: Song }>()
);
export const updateSong = createAction(
  '[SONG][UPDATE]',
  props<{ song: Song }>()
);
export const songUpdated = createAction(
  '[SONG][UPDATED]',
  props<{ song: Song }>()
);
export const deleteSong = createAction(
  '[SONG][DELETE]',
  props<{ song: Song }>()
);
export const songDeleted = createAction(
  '[SONG][DELETED]',
  props<{ song: Song }>()
);
