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

  /**
   * Este método se utiliza para obtener todos los usuarios.
   * Realiza una solicitud GET al servidor con el token en las cabeceras.
   *
   * @param {string} token - El token del usuario.
   * @returns {Observable<User[]>} - Un Observable que contiene una lista de usuarios.
   */
  findAll(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {
      headers,
    });
  }

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
   * Este método se utiliza para eliminar un usuario.
   * Realiza una solicitud DELETE al servidor con el ID del usuario y el token en las cabeceras.
   *
   * @param {string} id - El ID del usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable<void>} - Un Observable que completa en caso de éxito.
   */
  deleteUser(id: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`, {
      headers,
    });
  }

  /**
   * Este método se utiliza para eliminar varios usuarios a la vez.
   * Realiza una solicitud DELETE al servidor con los IDs de los usuarios y el token en las cabeceras.
   *
   * @param {string[]} ids - Los IDs de los usuarios.
   * @param {string} token - El token del usuario.
   * @returns {Observable<void>} - Un Observable que completa en caso de éxito.
   */
  bulkDetele(ids: string[], token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${environment.apiUrl}/users`, {
      headers,
      body: ids,
    });
  }
  /* Método para paginación */
  /* findAllPagination(
    token: string,
    skip = 0,
    take = 10
  ): Observable<{ data: User[]; total: number }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<{ data: User[]; total: number }>(
        `${environment.apiUrl}/users?skip=${skip}&take=${take}`,
        { headers: headers }
      )
      .pipe(
        map((response) => ({
          data: response.data,
          total: response.total,
        }))
      );
  } */
}
