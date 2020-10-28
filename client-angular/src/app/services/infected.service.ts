import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Infected } from '../models/infected-model';
import { TrackHttpError } from '../models/error-model';

@Injectable({
  providedIn: 'root'
})

export class InfectedService {

  constructor(private http: HttpClient) {}

  formData: Infected = new Infected();
  private _listeners = new Subject<any>();


  getInfected(): Observable<Infected[] | TrackHttpError>{
    return this.http.get<Infected[]>(environment.infectedURL)
    .pipe(
      catchError((err) => this.handleHttpError(err))
    );
  }

  addNewInfected(infected: any){    
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    return this.http.post<Infected>(environment.infectedURL, infected, {headers: headers})
    .pipe(
      catchError((err) => this.handleHttpError(err))
    );
  }

  updateInfected(infected: any){ 
    const { id } = infected;
    
    return this.http.put<Infected>(`${environment.infectedURL}/${id}`, infected)
    .pipe(
      catchError((err) => this.handleHttpError(err))
    );
  }

  deleteInfected(id: any){
    return this.http.delete(`${environment.infectedURL}/${id}`)
    .pipe(
      catchError((err) => this.handleHttpError(err))
    );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<TrackHttpError> {
    const dataError = new TrackHttpError()
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An unexpected error occured retrieving data";

    return throwError(dataError)
  }

  listen(): Observable<any>{
    return this._listeners.asObservable()
  }
  
  filter(filterBy: string){
    this._listeners.next(filterBy)
  }
}
