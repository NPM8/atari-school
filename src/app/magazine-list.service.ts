import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Magazine} from './magazine';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MagazineListService {
    private magazineUrl = 'http://localhost:9000/magazine';
  constructor(
      private http: HttpClient
  ) { }

    getMagazineList(): Observable<Magazine[]> {
      return this.http.get<Magazine[]>(this.magazineUrl + '/list')
          .pipe(tap(_ => console.log('feched list', catchError(console.log('could not fetch')))));
    }
}
