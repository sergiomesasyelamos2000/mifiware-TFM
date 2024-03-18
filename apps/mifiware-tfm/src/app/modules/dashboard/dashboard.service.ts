import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getGrafanaDashboardUrlBinary(userId: string, token: string) {
    console.log('entra en getGrafanaDashboardUrl del front');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${environment.apiUrl}/users/dashboard/binary`, {
      headers,
      responseType: 'text',
    });
    /* const headers = {
      Authorization:
        'Bearer ' + 'glsa_WdFlZAD7edtFKRW8WTha6unIqHNF7sjT_0f2f72bc',
    };
    this.http
      .get(
        'http://localhost:3003/api/dashboards/uid/a755de72-d8b9-42a8-86d4-53b2d2c378a4',
        {
          headers,
        }
      )
      .subscribe((response) => {
        console.log('response', response);

      }); */
  }

  getGrafanaDashboardUrlLocation(userId: string, token: string) {
    console.log('entra en getGrafanaDashboardUrl del front');

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
