import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Magazine} from './magazine';
import {Years} from './years';
import {Mgazineobj} from './mgazineobj';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MagazineListService {
    private magazineUrl = 'http://localhost:9000/magazines';
  constructor(
      private http: HttpClient
  ) { }

    getMagazineList(): Observable<Magazine[]> {
      return this.http.get<Magazine[]>(this.magazineUrl + '/list')
          .pipe(tap(() => console.log('feched list'), catchError(this.handleError('getMagazineList', []))));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getMagzineYears(mag: string): Observable<string[]> {
        console.log(mag);
        return this.http.post<string[]>(this.magazineUrl + '/get/years', { name: mag }, httpOptions)
            .pipe(tap(() => console.log(`get magzine mag=${mag}`)),
                catchError(this.handleError('getMagazineYears', [])));
    }

    getMagzines(mag: string, year: string): Observable<Mgazineobj[]> {
        console.log(mag);
        return this.http.post<Mgazineobj[]>(this.magazineUrl + '/get/magazines', { name: mag , year:  year}, httpOptions)
            .pipe(tap(() => console.log(`get magazine mag=${mag}`)),
                catchError(this.handleError('getMagazineYears', [])));
    }
}
