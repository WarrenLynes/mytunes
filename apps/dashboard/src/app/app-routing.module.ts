import { NgModule } from '@angular/core';
import { NotFoundComponent, UiModule } from '@tunes/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SpreadComponent } from './spread/spread.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'spread', pathMatch: 'full' },
      { path: '404', component: NotFoundComponent },
      {path: 'home', component: HomeComponent },
      { path: 'spread', canActivate: [AuthGuard], children: [
          { path: '', component: SpreadComponent}
      ]},
      { path: 'playlists', canActivate: [AuthGuard], children: [
          { path: '', component: PlaylistsComponent },
          { path: ':id', component: PlaylistComponent }
        ]},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
      { path: 'login', redirectTo: 'home', pathMatch: 'full' }
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
