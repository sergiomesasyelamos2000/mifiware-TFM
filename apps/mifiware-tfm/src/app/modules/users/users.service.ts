import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@mifiware-tfm/entity-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  findAll(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {
      headers,
    });
  }

  getUser(id: string, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, {
      headers,
    });
  }

  deleteUser(id: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`, {
      headers,
    });
  }

  bulkDetele(ids: string[], token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/users`, {
      headers,
      body: ids,
    });
  }
}
