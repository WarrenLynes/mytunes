import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tunes-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() title;
  @Input() sidenav;
  @Input() userIsAuthenticated;

  constructor() { }

  ngOnInit() {
    console.log(this.sidenav);
    this.sidenav.toggle();
    this.sidenav.open();
  }

}
