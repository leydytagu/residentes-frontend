import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-servicio-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './servicio-lista.component.html',
  styleUrl: './servicio-lista.component.css',
})
export class ServicioListaComponent {
  router = inject(Router);

  public listado = [
    {
      nombre: 'Piscina',
      descripcion: 'Piscina olimpica para adultos',
      apertura: '4:00 pm',
      cierre: '8:00 pm',
      dias: 'lunes, miercoles, jueves',
      encargado: 'Pepito',
      estado: 'Habilitado',
    },
    {
      nombre: 'Gimnasio',
      descripcion: 'Ginasio semidotado',
      apertura: '4:00 pm',
      cierre: '8:00 pm',
      dias: 'lunes, martes, jueves',
      encargado: 'Juanito',
      estado: 'Habilitado',
    },
  ];

  redirigirCrearServicio() {
    this.router.navigateByUrl('servicio-crear');
  }
}
