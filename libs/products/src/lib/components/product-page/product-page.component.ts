import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'primeng/rating';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  rating!: Rating;
  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(private prodService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
        this._getProductRating(params['productid']);
      }
    });
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }

  private _getProductRating(id: string) {
    this.prodService
      .getProductRating(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((rating: any) => {
        this.rating = rating.value;
      });
  }

}