import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  JwtTokenDto,
  LogInDto,
  SignUpDto,
} from '@mifiware-tfm/entity-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginDto: LogInDto): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(
      `${environment.apiUrl}/auth/login`,
      loginDto
    );
  }

  signUp(signUpDto: SignUpDto) {
    return this.http.post<void>(`${environment.apiUrl}/auth/signup`, signUpDto);
  }
}
