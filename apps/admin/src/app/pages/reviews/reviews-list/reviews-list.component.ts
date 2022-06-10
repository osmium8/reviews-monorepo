import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review, ReviewsService } from '@pranshu/reviewslib';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-reviews-list',
  templateUrl: './reviews-list.component.html',
})
export class ReviewsListComponent implements OnInit {

  reviews: Review[] = [];
  constructor(
    private reviewsService: ReviewsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getReviews();
  }

  _getReviews() {
    this.reviewsService.getReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  showReview(reviewId: any) {
    this.router.navigateByUrl(`reviews/detail/${reviewId}`);
  }

  deleteReview(reviewId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this review?',
      header: 'Delete Review',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reviewsService.deleteReview(reviewId).subscribe(
          () => {
            this._getReviews();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Review is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Review is not deleted!'
            });
          }
        );
      }
    });
  }

}
