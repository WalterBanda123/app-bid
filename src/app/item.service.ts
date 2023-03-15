import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { cards } from './data/cards';
import { Item } from './data/item';
import { User } from './data/user';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:4000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getItems(): Observable<Item | any> {
    return this.http
      .get<Item[]>(this.serverUrl + 'items')
      .pipe(catchError(this.handleError));
    //  return this.http.get('/items');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getItem(itemId: string): Observable<Item> {
    return this.http
      .get<Item>(this.serverUrl + `items/${itemId}`)
      .pipe(catchError(this.handleError));
  }

  //---Logging user ----
 
  getUser(credentials: { email: string, password: string } ): Observable<User> {
    return this.http
      .post<User>(this.serverUrl + 'users/login', credentials)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.serverUrl + `users`)
      .pipe(catchError(this.handleError));
  }

  getLoggedUser(userId:string): Observable<User>{
    return this.http.get<User>(this.serverUrl + `users/${userId}`)
  }
}