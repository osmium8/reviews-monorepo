import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, CategoriesService, Product, Category } from '@pranshu/products';
import { MessageService } from 'primeng/api';
import { map, timer } from 'rxjs';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {

  editmode = false;
  form: FormGroup | any;
  isSubmitted = false;
  catagories: Category[] = [];
  imageDisplay: string | ArrayBuffer | any;
  galleryImages: string[] | ArrayBuffer[] | any[] = [];
  currentProductId: string | any;

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
    this._checkEditMode();
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
      forReview: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!'
          });
        }
      }
    );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.form.controls['code'].disable();
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm.code.setValue(product.code);
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category?.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.forReview.setValue(product.forReview);
          this.productForm.description.setValue(product.description);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {

    console.log(this.code.errors);

    this.isSubmitted = true;
    //if (this.productForm.code.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).forEach((key) => {
      console.log(key);
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
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
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
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

