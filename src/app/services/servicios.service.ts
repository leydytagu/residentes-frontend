import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioModel } from '../core/models/servicio.model';
import { map } from 'rxjs';
import { ResidenteModel } from '../core/models/residente.model';
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

  getServicio(id: string) {
    return this.httpClient
      .get<{ ok: boolean; servicio: ServicioModel }>(
        `${base_url}/servicio/${id}`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.servicio));
  }

  crearServicio(servicio: ServicioModel) {
    return this.httpClient.post(`${base_url}/servicio`, servicio, this.headers);
  }

  actualizarServicio(id: string, servicio: ServicioModel) {
    return this.httpClient.put(
      `${base_url}/servicio/${id}`,
      servicio,
      this.headers
    );
  }

  eliminarServicio(id: string) {
    return this.httpClient.delete(`${base_url}/servicio/${id}`, this.headers);
  }
}
