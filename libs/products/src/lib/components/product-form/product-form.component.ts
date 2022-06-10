import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Subject, takeUntil, timer } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-form',
  templateUrl: './product-form.component.html',
})
export class CustomerProductFormComponent implements OnInit, OnDestroy {

  form: FormGroup | any;
  isSubmitted = false;
  catagories: Category[] = [];
  imageDisplay: string | ArrayBuffer | any;
  currentProductId: string | any;

  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required], this.validateProductCode.bind(this)],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false],
      forReview: [true]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.catagories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is sent for approval :)`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        if (error.error.invalidCode) {
          // Product already avaliable
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product already available on our website'
          })
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        } else {
          // server error
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!'
          });
        }
      }
    );
  }

  onSubmit() {

    this.isSubmitted = true;

    const productFormData = new FormData();
    Object.keys(this.productForm).forEach((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    this._addProduct(productFormData);
  }

  onCancel() {
    this.location.back();
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {

      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity(); // set image as form value
      
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        console.log(fileReader);
        this.imageDisplay = fileReader.result;
      };
      
    }
  }

  get productForm() {
    return this.form.controls;
  }

  get code() {
    return this.form.get('code');
  }

  validateProductCode(control: AbstractControl) {
    return this.productsService.getProductByCode(control.value).pipe(
      map((products: Product[]) => {
        return products.length ? { forbiddenProductCode: true } : null;
      })
    );
  }

}

