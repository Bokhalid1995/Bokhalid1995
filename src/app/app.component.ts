import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  isAuthenticated: string;
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    
    if (this.isAuthenticated == null) {
      this.router.navigateByUrl('/login');
    }
    this.router.events.subscribe((evt) => {
      this.isAuthenticated = localStorage.getItem('token');

      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
