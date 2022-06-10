import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {
  }

  getProductByCode(code: string) {
    return this.http.get<Product[]>(`${this.apiURLProducts}/all?code=${code}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/all`);
  }

  getProducts(categoriesFilter?: string[], brandQuery?: string, codeQuery?: string, nameQuery?: string): Observable<Product[]> {
    
    let params = new HttpParams();
    
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    if (brandQuery) {
      params = params.append('brand', brandQuery);
    }
    if (codeQuery) {
      params = params.append('code', codeQuery)
    }
    if (nameQuery) {
      params = params.append('name', nameQuery);
    }

    return this.http.get<Product[]>(this.apiURLProducts, { params: params });
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
  }

  getProductRating(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiURLProducts}/get/averageRating/${id}`);
  }

  getProductReviewsCount(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiURLProducts}/get/reviewCount/${id}`);
  }
}
