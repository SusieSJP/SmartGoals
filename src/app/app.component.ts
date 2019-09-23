import 'hammerjs';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smart-goals-app';
  path = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof RouterEvent) {
        this.path = event.url;
      }
    });
  }
}
