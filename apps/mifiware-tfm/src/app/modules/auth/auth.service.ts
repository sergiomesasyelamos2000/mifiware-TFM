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

  /**
   * Este método se utiliza para iniciar sesión en la aplicación.
   * Realiza una solicitud POST al endpoint de inicio de sesión con los datos de inicio de sesión proporcionados.
   *
   * @param {LogInDto} loginDto - Los datos de inicio de sesión del usuario.
   * @returns {Observable<JwtTokenDto>} - Un Observable que contiene el token JWT en caso de éxito.
   */
  login(loginDto: LogInDto): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(
      `${environment.apiUrl}/auth/login`,
      loginDto
    );
  }

  /**
   * Este método se utiliza para registrar un nuevo usuario en la aplicación.
   * Realiza una solicitud POST al endpoint de registro con los datos de registro proporcionados.
   *
   * @param {SignUpDto} signUpDto - Los datos de registro del nuevo usuario.
   * @returns {Observable<void>} - Un Observable que completa en caso de éxito.
   */
  signUp(signUpDto: SignUpDto) {
    return this.http.post<void>(`${environment.apiUrl}/auth/signup`, signUpDto);
  }
}
