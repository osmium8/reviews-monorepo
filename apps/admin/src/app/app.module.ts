import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// libs
import { CategoriesService, ProductsService } from '@pranshu/products';
import { AuthGuard, JwtInterceptor, UsersModule, UsersService } from '@pranshu/users';

// prime ng
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {FieldsetModule} from 'primeng/fieldset';
import {RatingModule} from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';

import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { ReviewsListComponent } from './pages/reviews/reviews-list/reviews-list.component';
import { ReviewsDetailComponent } from './pages/reviews/reviews-detail/reviews-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { RouterModule, Routes } from '@angular/router';

const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  FieldsetModule,
  RatingModule
]

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/form',
        component: ProductFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
      {
        path: 'reviews',
        component: ReviewsListComponent
      },
      {
        path: 'reviews/detail/:id',
        component: ReviewsDetailComponent
      }
    ]
  },
  {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, 
    CategoriesListComponent, 
    CategoriesFormComponent, 
    ProductListComponent, 
    ProductFormComponent, 
    UsersListComponent, 
    UsersFormComponent, 
    ReviewsListComponent, 
    ReviewsDetailComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    // AppRoutingModule, // contains routing for this app
    UsersModule,      // [lib: users] contains routing for login/logout
    ...UX_MODULE
  ],
  providers: [
    CategoriesService,
    ProductsService,
    UsersService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // add bearer token to api requests
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
