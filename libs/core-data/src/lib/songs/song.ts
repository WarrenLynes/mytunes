export interface Song {
  id: number;
  name: string;
  description: string;
}

export const emptySong: Song = {
  id: null,
  name: '',
  description: ''
};
