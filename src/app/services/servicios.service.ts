import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioModel } from '../core/models/servicio.model';
import { map } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getServicios() {
    return this.httpClient
      .get<{ ok: boolean; servicios: ServicioModel[] }>(
        `${base_url}/servicio`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.servicios));
  }

  crearServicio(servicio: ServicioModel) {
    return this.httpClient.post(`${base_url}/servicio`, servicio, this.headers);
  }

  actualizarServicio(servicio: ServicioModel) {
    return this.httpClient.put(
      `${base_url}/servicio/${servicio._id}`,
      servicio,
      this.headers
    );
  }

  eliminarServicio(id: string) {
    return this.httpClient.delete(`${base_url}/servicio/${id}`, this.headers);
  }
}
