import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Playlist, emptyPlaylist } from './playlist';

@Injectable({ providedIn: 'root' })
export class PlaylistsService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/me/playlists').pipe(
      map((x: any) => {console.log(x); return x;})
    )
  }

  create(model) {
    return this.httpClient.post('/api/me/playlists', model);
  }

  getUrlForId(id) {
    return `/api/me/playlists/${id}`;
  }

  update(model) {
    return this.httpClient.patch(this.getUrlForId(model.id),model)
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
