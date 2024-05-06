import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Residentes',
    children: [
      {
        path: 'home',
        title: 'Residentes - Inicio',
        component: HomeComponent,
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];
