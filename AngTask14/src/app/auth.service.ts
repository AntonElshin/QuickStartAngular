import {Injectable} from '@angular/core';
import {TokenResponse} from './interfaces/token-interface';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuth = false;

  constructor() {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(login: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (login === 'dsso' && password === '12345678') {
          this.setToken({
            idToken: 'abc1234567890',
            expiresIn: '60'
          });
          resolve(true);
        }
        else {
          resolve(false);
        }
      }, 2000);
    });
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: TokenResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
