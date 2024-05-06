import { MenuInterface } from '../interfaces/menu.interface';

export const MenuRoutes: MenuInterface[] = [
  {
    path: 'home',
    title: 'Inicio',
    icon: 'fa-solid fa-house',
    classCss: '',
    submenu: [],
  },
  {
    path: 'residente-lista',
    title: 'Residentes',
    icon: 'fa-solid fa-user',
    classCss: '',
    submenu: [],
  },
  {
    path: 'servicio-lista',
    title: 'Servicios',
    icon: 'fa-solid fa-list',
    classCss: '',
    submenu: [],
  },
  {
    path: 'reserva-lista',
    title: 'Reservas',
    icon: 'fa-solid fa-calendar',
    classCss: '',
    submenu: [],
  },
];
