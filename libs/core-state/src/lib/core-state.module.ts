import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@tunes/core-data';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { SongsEffects } from './songs/songs.effects';
import { PlaylistsEffects } from './playlists/playlists.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      SongsEffects,
      PlaylistsEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'tunes Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
