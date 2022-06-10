import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@pranshu/ui';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesService, ProductsModule, ProductsService } from '@pranshu/products';
import { HttpClientModule } from '@angular/common/http';
import { LocalstorageService, UsersModule } from '@pranshu/users';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    RouterModule.forRoot(routes), 
    UiModule,
    ProductsModule, // imports components( ProductSearch, CategoriesBanner) & routing
    AccordionModule,
    TagModule,
    HttpClientModule,
    UsersModule
  ],
  providers: [
    CategoriesService,
    ProductsService,
    //LocalstorageService, // get logged in User object
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
