import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResidenteListaComponent } from './pages/residente-lista/residente-lista.component';
import { ResidenteCrearComponent } from './pages/residente-crear/residente-crear.component';
import { ResidenteDetalleComponent } from './pages/residente-detalle/residente-detalle.component';
import { ServicioListaComponent } from './pages/servicio-lista/servicio-lista.component';
import { ServicioCrearComponent } from './pages/servicio-crear/servicio-crear.component';
import { ServicioDetalleComponent } from './pages/servicio-detalle/servicio-detalle.component';
import { ReservaListaComponent } from './pages/reserva-lista/reserva-lista.component';
import { ReservaCrearComponent } from './pages/reserva-crear/reserva-crear.component';
import { ReservaDetalleComponent } from './pages/reserva-detalle/reserva-detalle.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { residenteResolver } from './core/resolvers/residente/residente.resolver';
import { servicioResolver } from './core/resolvers/servicio/servicio.resolver';
import { reservaResolver } from './core/resolvers/reserva/reserva.resolver';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    title: 'Residentes',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Inicio',
        component: HomeComponent,
      },
      {
        path: 'residente-lista',
        title: 'Listar Residentes',
        component: ResidenteListaComponent,
        resolve: {
          residentes: residenteResolver,
        },
      },
      {
        path: 'residente-crear',
        title: 'Crear Residente',
        component: ResidenteCrearComponent,
      },
      {
        path: 'residente-detalle/:id',
        title: 'Detalle Residente',
        component: ResidenteDetalleComponent,
      },
      {
        path: 'servicio-lista',
        title: 'Listar Servicios',
        component: ServicioListaComponent,
        resolve: {
          servicios: servicioResolver,
        },
      },
      {
        path: 'servicio-crear',
        title: 'Crear Servicio',
        component: ServicioCrearComponent,
      },
      {
        path: 'servicio-detalle/:id',
        title: 'Detalle Servicio',
        component: ServicioDetalleComponent,
      },
      {
        path: 'reserva-lista',
        title: 'Listar Reservas',
        component: ReservaListaComponent,
        resolve: {
          reservas: reservaResolver,
        },
      },
      {
        path: 'reserva-crear',
        title: 'Crear Reserva',
        component: ReservaCrearComponent,
      },
      {
        path: 'reserva-detalle/:id',
        title: 'Detalle Reserva',
        component: ReservaDetalleComponent,
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];
