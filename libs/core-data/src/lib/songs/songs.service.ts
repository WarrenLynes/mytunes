import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Song, emptySong } from './song';

@Injectable({ providedIn: 'root' })
export class SongsService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/me/tracks').pipe(
      map((x: any) => x.items.map((xx) => xx.track))
    )
  }

  create(model) {
    return this.httpClient.post('/api/me/tracks', model);
  }

  getUrlForId(id) {
    return `/api/me/tracks/${id}`;
  }

  update(model) {
    return this.httpClient.patch(this.getUrlForId(model.id),model)
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
