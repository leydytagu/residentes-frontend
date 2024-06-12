import { inject, Injectable } from '@angular/core';
import {
  LoginInterface,
  OlvidoInterface,
} from '../core/interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PATH } from '../core/enum/path.enum';
import { ResidenteModel } from '../core/models/residente.model';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ResidentesService {
  private router = inject(Router);

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuario(): ResidenteModel {
    return JSON.parse(localStorage.getItem('usuario') || '');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getResidentes() {
    return this.httpClient
      .get<{ ok: boolean; residentes: ResidenteModel[] }>(
        `${base_url}/residente`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.residentes));
  }

  getResidente(id: string) {
    return this.httpClient
      .get<{ ok: boolean; residente: ResidenteModel }>(
        `${base_url}/residente/${id}`,
        this.headers
      )
      .pipe(map((respuesta) => respuesta.residente));
  }

  crearResidente(residente: ResidenteModel) {
    return this.httpClient.post(
      `${base_url}/residente`,
      residente,
      this.headers
    );
  }

  actualizarResidente(id: string, residente: ResidenteModel) {
    return this.httpClient.put(
      `${base_url}/residente/${id}`,
      residente,
      this.headers
    );
  }

  eliminarResidente(id: string) {
    return this.httpClient.delete(`${base_url}/residente/${id}`, this.headers);
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      })
    );
  }

  olvidoContrasena(data: OlvidoInterface) {
    return this.httpClient.post(`${base_url}/login/olvidocontrasena`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl(PATH.LOGIN);
  }
}
