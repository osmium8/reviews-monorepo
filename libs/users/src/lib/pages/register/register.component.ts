import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup | any;
  isSubmitted = false;
  authError = false;
  authMessage = 'User already registered with this email.';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initRegisterForm();
  }

  private _initRegisterForm() {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerFormGroup.invalid) return;

    this.auth.register(this.registerForm.name.value, this.registerForm.email.value, this.registerForm.password.value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.localstorageService.setUserId(user.id);
        console.log('registered user', user);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        } else {
          this.authMessage = 'Error: A user is already registered with this email address'
        }
      }
    );
  }

  get registerForm() {
    return this.registerFormGroup.controls;
  }

  get password() {
    return this.registerFormGroup.get('password');
  }
}
