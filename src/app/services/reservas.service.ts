import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { ReservaModel } from '../core/models/reserva.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
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

  getReservas() {
    return this.httpClient
      .get<{ ok: boolean; reservas: ReservaModel[] }>(
        `${base_url}/reserva`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.reservas));
  }

  getReserva(id: string) {
    return this.httpClient
      .get<{ ok: boolean; reserva: ReservaModel }>(
        `${base_url}/reserva/${id}`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.reserva));
  }

  crearReserva(reserva: ReservaModel) {
    return this.httpClient.post(`${base_url}/reserva`, reserva, this.headers);
  }

  actualizarReserva(id: string, residente: ReservaModel) {
    return this.httpClient.put(
      `${base_url}/reserva/${id}`,
      residente,
      this.headers
    );
  }

  eliminarReserva(id: string) {
    return this.httpClient.delete(`${base_url}/reserva/${id}`, this.headers);
  }

  contacto(data: ReservaModel) {
    return this.httpClient.post(`${base_url}/contacto`, data, this.headers);
  }
}
