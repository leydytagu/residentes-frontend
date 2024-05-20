import { Component, inject } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-lista',
  standalone: true,
  templateUrl: './reserva-lista.component.html',
  styleUrl: './reserva-lista.component.css',
  imports: [TableComponent],
})
export class ReservaListaComponent {
  router = inject(Router);

  public listado = [
    {
      residente: 'Juan',
      servicio: 'Piscina',
      hora: '4:00 pm',
      comentarios: '-',
    },
    {
      residente: 'Camilo',
      servicio: 'Gimnasio',
      hora: '3:00 pm',
      comentarios: 'Necesita instructor',
    },
  ];

  redirigirCrearReserva() {
    this.router.navigateByUrl('reserva-crear');
  }
}
