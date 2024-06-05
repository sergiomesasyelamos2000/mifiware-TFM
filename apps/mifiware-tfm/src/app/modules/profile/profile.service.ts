import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '@mifiware-tfm/entity-data-models';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Este método se utiliza para obtener los datos de un usuario.
   * Realiza una solicitud GET al servidor con el ID del usuario y el token en las cabeceras.
   *
   * @param {string} id - El ID del usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable<User>} - Un Observable que contiene los datos del usuario.
   */
  getUser(id: string, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, {
      headers,
    });
  }

  /**
   * Este método se utiliza para actualizar los datos de un usuario.
   * Realiza una solicitud PATCH al servidor con el ID del usuario, los nuevos datos del usuario y el token en las cabeceras.
   *
   * @param {string} id - El ID del usuario.
   * @param {User} user - Los nuevos datos del usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable<User>} - Un Observable que contiene los datos actualizados del usuario.
   */
  updateUser(id: string, user: User, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<User>(`${environment.apiUrl}/users/${id}`, user, {
      headers,
    });
  }

  /**
   * Este método se utiliza para crear un nuevo usuario.
   * Realiza una solicitud POST al servidor con los datos del nuevo usuario y el token en las cabeceras.
   *
   * @param {User} user - Los datos del nuevo usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable<User>} - Un Observable que contiene los datos del nuevo usuario.
   */
  createUser(user: User, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<User>(`${environment.apiUrl}/users`, user, {
      headers,
    });
  }
}
