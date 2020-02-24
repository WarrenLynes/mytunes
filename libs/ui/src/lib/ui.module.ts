import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@tunes/material';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, MaterialModule, CommonModule, RouterModule],
  declarations: [
    LoginComponent,
    NotFoundComponent,
    ToolbarComponent,
  ],
  exports: [
    LoginComponent,
    NotFoundComponent,
    ToolbarComponent,
  ]
})
export class UiModule {}
