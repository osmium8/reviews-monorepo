import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  apiURLReviews = environment.apiURL + 'reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiURLReviews);
  }

  getReview(reviewId: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiURLReviews}/${reviewId}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiURLReviews, review);
  }

  updateReview(reviewStaus: { isApproved: boolean }, reviewId: string): Observable<Review> {
    return this.http.put<Review>(`${this.apiURLReviews}/${reviewId}`, reviewStaus);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLReviews}/${reviewId}`);
  }

  getReviewsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiURLReviews}/get/count`)
      .pipe(map((objectValue: any) => objectValue.reviewsCount));
  }

  getProductReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiURLReviews}/forProduct/${productId}`);
  }

  addReview(id: string, review: Review): Observable<Review>{
    return this.http.put<Review>(`${this.apiURLReviews}/addReview/${id}`, review);
  }
}
