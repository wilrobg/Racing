import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Member } from './models/Member.model';
import { Team } from './models/Team.model';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000/api';
  username: string = '';

  constructor(private http: HttpClient) { }

  // Returns all members
  public getMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  public getTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  public getMemberById(id: string):Observable<Member> {
    return this.http
      .get<Member>(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }


  setUsername(name: string): void {
    this.username = name;
  }

  //POST

  addMember(data: any) {
    return this.http
      .post(`${this.api}/addMember`, data)
      .pipe(catchError(this.handleError));
  }

  //PUT

  updateMember(id: any,data: any) {
    return this.http
      .put(`${this.api}/members/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  //DELETE
  deleteMember(id: any) {
    return this.http
    .delete(`${this.api}/members/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg
    if (error.error instanceof ErrorEvent) {
      errorMsg = `An error occurred:', ${error.error.message}`
    } else {
      errorMsg = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
    }
    console.error(errorMsg);

    return throwError(errorMsg);
  }
}
