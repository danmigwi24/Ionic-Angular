import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

/**
 We import:

HttpClient for sending POST request to the Express server that handles authentication,

The tap() operator for performing side effects when subscribing to the observables returned by the HttpClient methods,

The Storage module for persisting the access token and expiration date in the local storage,

The Observable, BehaviorSubject APIs for working with asynchronous operations,

The User and AuthResponse interfaces.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //The AUTH_SERVER_ADDRESS holds the address of the Express authentication server and authSubject is a type of Observable that will be used to subscribe to the authentication state.
  AUTH_SERVER_ADDRESS: string = 'http://102.37.14.127:5000/auth';
  authSubject = new BehaviorSubject(false);
  /**
   * Next, inject HttpClient and Storage services via the service's constructor:
   */
  constructor(private httpClient: HttpClient, private storage: Storage) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    });
  }
  /**
   * Sending a POST Request with HttpClient for Authenticating Users
   */
  register(user: User): Observable<AuthResponse> {
    //We simply use the post() method to send a POST request to the /register endpoint exposed by our authentication server

    //We use the pipe() function to chain multiple operators.

    return this.httpClient
      .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/mobileapplogin`, user, {
        headers: this.getHeaders(),
      })
      .pipe(
        //we use the tap() operator that's available from RxJS ,we want to perform a side effect for storing JWT information (the access token) in the local storage so we use the tap()
        tap(async (res: AuthResponse) => {
          if (res.userResponse) {
            //In the tap() operator we check if the response has a user object and we set persist the access token
            await this.storage.set('ACCESS_TOKEN', res.userResponse.data.token);
            await this.storage.set(
              'USER_DATA',
              res.userResponse.statusDescription
            );
            //we emit a true value to our authSubject using the next() method.
            this.authSubject.next(true);
          }
        })
      );
  }

  /**
   * Sending a POST Request with HttpClient for Registering Users
   */
  //We send a POST request with HttpClient to the /login endpoint of our Express.js server that handles JWT authentication. Next, we perform a side effect using the pipe() method and tap() operator available from RxJS for persist the JWT access token and expiration date returned from the server.
  login(user: User): Observable<AuthResponse> {
    return this.httpClient
      .post(`${this.AUTH_SERVER_ADDRESS}/mobileapplogin`, user, {
        headers: this.getHeaders()
      })
      .pipe(       
        tap(async (res: AuthResponse) => {
          if (res.userResponse) {
            console.log( this.getHeaders());
            await this.storage.set('ACCESS_TOKEN', res.userResponse.data.token);
            await this.storage.set('USER_DATA', res.userResponse.data);
            this.authSubject.next(true);
          }
        })
      );
  }
  /**
   * Logging out Users
   */

  //Next, add the logout() method that will be used for removing JWT authentication information from the local storage:
  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('USER_DATA');
    //We also emit a false value in the BehaviorSubject representing the authentication state.
    this.authSubject.next(false);
  }

  /**Getting the Authentication State */
  //Finally add the isLoggedIn() method that will be used for checking id the user is logged in or not:
  isLoggedIn() {
    //We simply return authSubject variable casted to an Observable using the asObservable() method. You can check if the user is logged in by subscribing to call of this method.
    return this.authSubject.asObservable();
  }
}
