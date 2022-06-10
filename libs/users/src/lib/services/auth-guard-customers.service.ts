import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

/**
 * checks for token expiration
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardCustomers implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {

      // tokenDecode {userId, isAdmin, iat, exp}
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (!this._tokenExpired(tokenDecode.exp)) {
        // authorized
        return true;
      }
    }

    // un-authorized
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
