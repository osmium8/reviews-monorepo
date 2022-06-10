import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsFormComponent } from './components/reviews-form/reviews-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthGuardCustomers } from '@pranshu/users';

export const reviewslibRoutes: Route[] = [];
const routes: Routes = [
  {
    path: 'review/:productid',
    component: ReviewsFormComponent,
    canActivate: [AuthGuardCustomers]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,

    RouterModule.forChild(routes)
  ],
  declarations: [
    ReviewsListComponent,
    ReviewsFormComponent
  ],
  exports: [
    ReviewsListComponent,
    ReviewsFormComponent,
  ],
})
export class ReviewslibModule {}
