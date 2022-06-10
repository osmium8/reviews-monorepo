import { Component, OnInit } from '@angular/core';
import { CategoriesService, ProductsService } from '@pranshu/products';
import { ReviewsService } from '@pranshu/reviewslib';
import { UsersService } from '@pranshu/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  statistics: any[] = [];

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private reviewsService: ReviewsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.reviewsService.getReviewsCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.categoriesService.getCategoriesCount(),
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }

}
