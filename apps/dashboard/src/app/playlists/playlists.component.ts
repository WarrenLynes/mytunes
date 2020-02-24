import { Component, OnInit } from '@angular/core';
import { PlaylistsFacade } from '@tunes/core-state';
import { Router } from '@angular/router';

@Component({
  selector: 'tunes-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists$: any = this.facade.allPlaylists$;

  constructor(
    private facade: PlaylistsFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.facade.loadPlaylists();
  }

  selectPlaylist(id) {
    this.facade.selectPlaylist(id);
    this.router.navigateByUrl('/playlists/' + id);
  }
}
