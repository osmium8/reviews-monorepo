import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router,
    private userService: UsersService
  ) {
    
    // this.userService.getUser(token.getUserId()).subscribe((user) => {
    //   this.user = user;
    // });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email: email, password: password });
  }

  register(name : string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, { name: name, email: email, password: password });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
