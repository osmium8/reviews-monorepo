import { Injectable } from '@angular/core';

/**
 * saves jwt authentication token
 * saves userId for posting reviews with userId
 */
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private TOKEN = 'jwtToken';
  private USER = 'user'

  setToken(data: any) {
    localStorage.setItem(this.TOKEN, data);
  }

  setUserId(data: any) {
    console.log('serUserId', data);
    localStorage.setItem(this.USER, data);
  }

  getUserId(): any {
    return localStorage.getItem(this.USER);
  }

  getToken(): any {
    return localStorage.getItem(this.TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }
}
