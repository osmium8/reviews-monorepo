import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@pranshu/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup | any;
  isSubmitted = false;
  editmode = false;
  currentCategoryId: string | any;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value
    };
    console.log('editMode above it', this.editmode)
    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`
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
          detail: 'Category is not created!'
        });
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
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
          detail: 'Category is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService.getCategory(params['id']).subscribe((category) => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

}