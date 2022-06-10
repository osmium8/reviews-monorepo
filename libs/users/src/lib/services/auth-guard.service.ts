import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

/**
 * checks for token expiration
 * and admin privileges
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public adminAuthError$: Observable<any>;
  private adminAuthError: BehaviorSubject<any>;

  constructor(private router: Router, private localStorageToken: LocalstorageService) {
    this.adminAuthError = new BehaviorSubject<any>(null);
    this.adminAuthError$ = this.adminAuthError.asObservable();
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {

      // tokenDecode {userId, isAdmin, iat, exp}
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
        // authorized
        this.adminAuthError.next(false);
        return true;
      }
    }

    this.adminAuthError.next(true); // emit {true} to the observers

    // un-authorized
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
