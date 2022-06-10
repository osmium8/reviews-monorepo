import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Rating } from 'primeng/rating';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  rating!: Rating;
  reviewsCount!: number;
  pointer = 'pointer';

  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this._getProductRating(this.product.id);
    this._getProductRreviewsCount(this.product.id);
  }

  private _getProductRating(id: any) {
    this.prodService
      .getProductRating(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((rating: any) => {
        this.rating = rating.value;
      });
  }

  private _getProductRreviewsCount(id: any) {
    this.prodService
      .getProductReviewsCount(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((count: any) => {
        this.reviewsCount = count.value;
      });
  }
}
