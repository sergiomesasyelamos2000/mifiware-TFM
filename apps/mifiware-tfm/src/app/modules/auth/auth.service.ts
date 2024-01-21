import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../core/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {
      username,
      password,
    });
  }

  signUp(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/signup`, user);
  }
}
