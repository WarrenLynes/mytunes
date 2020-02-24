import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'tunes-snackbar',
  templateUrl: 'snackbar.component.html',
  styles: [`
    .mat-snack-bar-container {
      background: #2f2f2f;!important;
    }
  `],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

