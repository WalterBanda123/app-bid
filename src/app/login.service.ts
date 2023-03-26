import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AuthService) {}

  isLogged: boolean = false;
  isUserLogged() {
    this.authService.isLoggedIn$.subscribe((state) => this.isLogged === state);
    return this.isLogged;
  }
}
