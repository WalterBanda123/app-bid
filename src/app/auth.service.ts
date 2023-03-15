import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from './item.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(private itemService: ItemService) {
    const token = localStorage.getItem('authenticatedUser')
    this._isLoggedIn$.next(!!token)
  }

  authUser(userCredentials:any) {
    return this.itemService.getUser(userCredentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authenticatedUser', response.token);
        this._isLoggedIn$.next(true);
      })
    );
  }
}
