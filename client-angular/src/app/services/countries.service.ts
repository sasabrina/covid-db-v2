import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Country } from '../models/country-model';
import { TrackHttpError } from '../models/error-model';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  constructor( private http: HttpClient ) {}

  getCountries(): Observable<Country[] | TrackHttpError>{
    return this.http.get<Country[]>(environment.countriesURL)
    .pipe(
      catchError((err) => this.handleHttpError(err))
    )
  }

  getInfectedCountries(): Observable<Country[] | TrackHttpError>{
    return this.http.get<Country[]>(environment.infectedCountriesURL)
    .pipe(
      catchError((err) => this.handleHttpError(err))
    )
  }
  private handleHttpError(error: HttpErrorResponse): Observable<TrackHttpError> {
    const dataError = new TrackHttpError()
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An unexpected error occured retrieving data";

    return throwError(dataError)
  }
}
