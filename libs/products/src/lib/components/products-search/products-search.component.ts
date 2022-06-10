import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent implements OnInit {
  nameQuery!: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  nameFilter() {
    this.router.navigate([`/products/${this.nameQuery}`]);
  }

}
