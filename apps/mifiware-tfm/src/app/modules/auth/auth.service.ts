import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  JwtTokenDto,
  LogInDto,
  MessageSeverity,
  SignUpDto,
} from '@mifiware-tfm/entity-data-models';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginDto: LogInDto): Observable<JwtTokenDto> {
    console.log('ENTRA EN EL SERVICIO', loginDto);

    return this.http.post<JwtTokenDto>(
      `${environment.apiUrl}/auth/login`,
      loginDto
    );
  }

  signUp(signUpDto: SignUpDto) {
    return this.http.post<void>(`${environment.apiUrl}/auth/signup`, signUpDto);
  }
}
