import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from './item.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenForLoggedUser?: string;
  private loggedUserDetails: any;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'authenticatedUser';

  //---TOKEN GETTER
  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private itemService: ItemService,
    private jwtHelperItem: JwtHelperService,
    private router: Router
  ) {
    // const token = localStorage.getItem('authenticatedUser');
    this._isLoggedIn$.next(!!this.token);
  }

  //---SETTING OUR TOKEN , so that we can GET it LATER FOR DECODING
  setToken(token: string) {
    this.tokenForLoggedUser = token;

    this.loggedUserDetails = this.jwtHelperItem.decodeToken(token);
  }
  getToken() {
    return this.tokenForLoggedUser;
  }

  getUserWhoIsLogged() {
    return this.loggedUserDetails;
  }

  //-------GETTING USER DETAILS FOR VERIFICATION BEFORE LOGGING THEM IN--
  authUser(userCredentials: any) {
    return this.itemService.getUser(userCredentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_NAME);
    this.router.navigateByUrl('/login');
  }
}
