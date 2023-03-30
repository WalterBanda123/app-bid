import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BiddingService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:4000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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

  getBidList(): Observable<any> {
    return this.http
      .get<any>(this.serverUrl + `autobid`)
      .pipe(catchError(this.handleError));
  }

  getBid(bidId: string): Observable<any> {
    return this.http
      .get<any>(this.serverUrl + `autobid/${bidId}`)
      .pipe(catchError(this.handleError));
  }

  isBidActive(isActiveNew: boolean, bidId: string): Observable<any> {
    return this.http
      .patch<any>(this.serverUrl + `autobid/${bidId}`, {
        isActiveNew,
      })
      .pipe(catchError(this.handleError));
  }

  getExistingBids(itemId: string, userId: string): Observable<any> {
    return this.http.get<any>(
      this.serverUrl + `autobid/exist`, 
    );
  }
}
