import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../components/auth/user.model';

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

  constructor(private http: HttpClient) {}
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
  }
}
