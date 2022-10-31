import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../components/auth/user.model';
import { Router } from '@angular/router';

export interface responseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  logoutTimer!: ReturnType<typeof setTimeout> | null;

  constructor(private http: HttpClient, private router: Router) {}
  signup(email: string, password: string) {
    return this.http
      .post<responseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC7sE4vUNTa_rT8P4jy8XUKpXGZyclv6c',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuthentication(email, localId, idToken, Number(expiresIn));
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<responseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC7sE4vUNTa_rT8P4jy8XUKpXGZyclv6c',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuthentication(email, localId, idToken, Number(expiresIn));
        })
      );
  }

  handleError(errorResponse: any) {
    let errorMessage = 'Unknown Error Occurred';
    if (!errorResponse.error || !errorResponse.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email ID does not exist. Please Sign Up!!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'Invalid credentials. Either Email or Password is Incorrect';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'This Email ID has been blocked. Please contact Helpdesk!!';
        break;
    }
    return throwError(errorMessage);
  }

  handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, localId, idToken, expirationDate);
    this.user.next(newUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData_RecipeStore', JSON.stringify(newUser));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData_RecipeStore');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const user = localStorage.getItem('userData_RecipeStore');
    if (!user) {
      return;
    }
    let userObj: {
      email: string;
      userId: string;
      _token: string;
      _tokenExiprationDate: string;
    } = JSON.parse(user);
    const storedUser = new User(
      userObj.email,
      userObj.userId,
      userObj._token,
      new Date(userObj._tokenExiprationDate)
    );
    if (storedUser.token) {
      this.user.next(storedUser);
      const expirationDuration =
        new Date(userObj._tokenExiprationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(tokenExiprationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, tokenExiprationDuration);
  }
}
