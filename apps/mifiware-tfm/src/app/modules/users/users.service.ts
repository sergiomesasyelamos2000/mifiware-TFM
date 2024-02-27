import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  JwtTokenDto,
  LogInDto,
  MessageSeverity,
  SignUpDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  findAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUser(id: string, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, {
      headers,
    });
  }
}
