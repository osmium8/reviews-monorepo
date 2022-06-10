import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit, OnDestroy {
  searchmode = false;
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage!: boolean;
  brandQuery!: string;
  nameQuery!: string;
  codeQuery!: string;
  selectedCategories: any[] = [];

  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['search']) {
        this.nameQuery = params['search'];
        this._getProducts([], this.brandQuery, this.codeQuery, this.nameQuery)
      } else {
        params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts([], this.brandQuery, this.codeQuery, this.nameQuery);
        params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
      }
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[], brandQuery?: string, codeQuery?: string, nameQuery?: string) {
    this.prodService.getProducts(categoriesFilter, brandQuery, codeQuery, nameQuery)
    .pipe(takeUntil(this.endSubs$))
    .subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.catService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.categories = categories;
    });
  }

  categoryFilter() {
    this.selectedCategories
      = this.categories
        .filter((category) => category.checked)
        .map((category) => category.id);

    this._getProducts(this.selectedCategories, this.brandQuery, this.codeQuery, this.nameQuery);
  }

  brandFilter() {
    this._getProducts(this.selectedCategories, this.brandQuery, this.codeQuery, this.nameQuery);
  }

  nameFilter() {
    this._getProducts(this.selectedCategories, this.brandQuery, this.codeQuery, this.nameQuery);
  }

  codeFilter() {
    this._getProducts(this.selectedCategories, this.brandQuery, this.codeQuery, this.nameQuery);
  }

  goToNewProduct() {
    this.router.navigate(['/productform']);
  }
}
