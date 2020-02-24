import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({providedIn: 'root'})
export class SnackbarService {

  snackbarRefs: MatSnackBarRef<SimpleSnackBar>[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, duration=1000) {
    this.snackbarRefs.push(this._snackBar.open(message, null, {
      duration
    }));
  }
}
