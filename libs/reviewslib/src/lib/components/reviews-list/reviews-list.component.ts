import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'reviewslib-reviews-list',
  templateUrl: './reviews-list.component.html',
})
export class ReviewsListComponent implements OnInit {

  @Input() productId!: string
  reviews!: Review[];
  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this._getProductReviews();
  }

  private _getProductReviews() {
    console.log('ReviewsListComponent', this.productId);
    this.reviewsService
      .getProductReviews(this.productId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((reviews: any[]) => {
        this.reviews = reviews;
      });
  }

}
