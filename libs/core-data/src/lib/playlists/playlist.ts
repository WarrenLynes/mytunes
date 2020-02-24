export interface Playlist {
  id: number;
  name: string;
  description: string;
}

export const emptyPlaylist: Playlist = {
  id: null,
  name: '',
  description: ''
};
