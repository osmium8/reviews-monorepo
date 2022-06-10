import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, LocalstorageService, UsersService } from '@pranshu/users';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'reviewslib-reviews-form',
  templateUrl: './reviews-form.component.html',
  styles: [
  ]
})
export class ReviewsFormComponent implements OnInit {


  editmode = false;
  form: FormGroup | any;
  isSubmitted = false;
  imageDisplay: string | ArrayBuffer | any;
  currentProductId: string | any;
  user!: User;

  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private localstorageService: LocalstorageService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.usersService.getUser(this.localstorageService.getUserId()).subscribe((user) => {
      this.user = user;
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(400)]]
    });
  }

  private _addReview(productId: string, review: Review) {
    this.reviewService.addReview(productId, review)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(
      (review: Review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Review is successfully added, will be approved shortly!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Review cannot be added'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this.currentProductId = params['productid'];
      }
    });

    const review: Review = {
      user: this.user,
      rating: this.reviewForm.rating.value,
      description: this.reviewForm.description.value
    };

    this._addReview(this.currentProductId, review);
  }

  onCancel() { 
    this.location.back();
  }

  get reviewForm() {
    return this.form.controls;
  }

  get description() {
    return this.form.get('description');
  }

}
