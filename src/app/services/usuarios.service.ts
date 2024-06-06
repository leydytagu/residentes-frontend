import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";
import {ResidenteModel} from "../core/models/residente.model";
import {LoginInterface} from "../core/interfaces/login.interface";
import {PATH} from "../core/enum/path.enum";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private router = inject(Router);
  usuario: ResidenteModel;

  constructor(private httpClient: HttpClient) {}

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.httpClient
      .get(`${base_url}/login`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            _id,
            nombre,
            tipoDocumento,
            numeroDocumento,
            rol,
            createAt,
            numerocelular,
            peso,
            fechanacimiento,
            password,
          } = resp.usuario;

          this.usuario = new ResidenteModel(
            _id,
            nombre,
            tipoDocumento,
            numeroDocumento,
            rol,
            createAt,
            numerocelular,
            peso,
            fechanacimiento,
            password
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          // console.error(error);
          return of(false);
        })
      );
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigateByUrl(PATH.LOGIN);
  }

  getUsuarios() {
    return this.httpClient.get(`${base_url}/usuario`);
  }
}
