import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthGuard } from '../../services/auth-guard.service';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup | any;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  // private userSubject: BehaviorSubject<any>;
  // public user$: Observable<any>;

  public adminAuthError$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private authService: AuthService,
    private authGaurd: AuthGuard
  ) {
    // this.userSubject = new BehaviorSubject<any>(localstorageService.getUserId());
    // this.user$ = this.userSubject.asObservable();

    this.adminAuthError$ = this.authGaurd.adminAuthError$;
  }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.localstorageService.setUserId(user.id);
        console.log('user', user);

        // this.userSubject.next(user);

        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
