import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review, ReviewsService } from '@pranshu/reviewslib';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-reviews-detail',
  templateUrl: './reviews-detail.component.html',
  styles: [
  ]
})
export class ReviewsDetailComponent implements OnInit {

  review: Review | any;
  selectedApprovalStatus: any;

  constructor(
    private reviewsService: ReviewsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getReview();
  }

  private _getReview() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.reviewsService.getReview(params['id']).subscribe((review) => {
          this.review = review;
          this.selectedApprovalStatus = review.isApproved;
        });
      }
    });
  }

  onStatusChange(event: any) {
    console.log(event);
    this.reviewsService.updateReview({ isApproved: event.checked }, this.review.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Review approval status is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Review approval status is not updated!'
        });
      }
    );
  }

  onCancel() {this.location.back();}

}
