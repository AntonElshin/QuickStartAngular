import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuth = false;

  login(login: string, password: string): void {
    if (login === 'dsso' && password === '12345678') {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }

  logout(): void {
    this.isAuth = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(this.isAuth);
      }, 1000);
    });
  }
}
