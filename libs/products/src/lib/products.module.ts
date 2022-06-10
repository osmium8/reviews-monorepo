import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

// UI imports
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';

// authentication
import { JwtInterceptor } from '@pranshu/users';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerProductFormComponent } from './components/product-form/product-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReviewslibModule } from '@pranshu/reviewslib';

const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
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
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductListComponent
  },
  {
    path: 'product/:productid',
    component: ProductPageComponent
  },
  {
    path: 'productform',
    component: CustomerProductFormComponent
  },
  {
    path: 'products/:search',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,

    ReviewslibModule,
    
    RouterModule.forChild(routes),
    ...UX_MODULE
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent,
    CustomerProductFormComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent,
    CustomerProductFormComponent
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // add bearer token to api requests
  ]
})
export class ProductsModule {}
