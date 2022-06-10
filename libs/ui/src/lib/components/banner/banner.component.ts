import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit {
  router: Router;

  constructor(router: Router) { 
    this.router = router;
  }

  ngOnInit(): void {
  }

  showProducts() {
    this.router.navigate(['/products']);
  }

}
