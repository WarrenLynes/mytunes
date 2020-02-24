import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsService } from './songs/songs.service';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PlaylistsService } from './playlists/playlists.service';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [ CommonModule, HttpClientModule ],
  providers: [ SongsService, PlaylistsService ],
  entryComponents: [SnackbarComponent],
})
export class CoreDataModule {}
