import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  /**
   * Este método se utiliza para obtener la URL del panel de Grafana para los sensores binarios.
   * Realiza una solicitud GET al servidor con el ID del usuario y el token en las cabeceras.
   *
   * @param {string} userId - El ID del usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable} - Un Observable que contiene la respuesta del servidor.
   */

  getGrafanaDashboardUrlBinary(userId: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${environment.apiUrl}/users/dashboard/binary`, {
      headers,
      responseType: 'text',
    });
  }

  /**
   * Este método se utiliza para obtener la URL del panel de Grafana para los sensores de ubicación.
   * Realiza una solicitud GET al servidor con el ID del usuario y el token en las cabeceras.
   *
   * @param {string} userId - El ID del usuario.
   * @param {string} token - El token del usuario.
   * @returns {Observable} - Un Observable que contiene la respuesta del servidor.
   */
  getGrafanaDashboardUrlLocation(userId: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${environment.apiUrl}/users/dashboard/location`, {
      headers,
      responseType: 'text',
    });
  }
}
