import { Component, OnInit } from '@angular/core';
import { PlaylistsFacade, SongsFacade } from '@tunes/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tunes-spread',
  templateUrl: './spread.component.html',
  styleUrls: ['./spread.component.scss']
})
export class SpreadComponent implements OnInit {
  playlists$: Observable<any[]> = this.playlistsFacade.allCollaborativePlaylists$;
  songs$: Observable<any[]> = this.songsFacade.allSongs$;

  constructor(
    private songsFacade: SongsFacade,
    private playlistsFacade: PlaylistsFacade
  ) { }

  ngOnInit() {
  }

  edit(songId: any) {
    this.songsFacade.selectSong(songId);
  }

  addToPlaylist(playlistId, songId) {

  }
}
