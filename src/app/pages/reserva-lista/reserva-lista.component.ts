import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaModel } from '../../core/models/reserva.model';

@Component({
  selector: 'app-reserva-lista',
  standalone: true,
  templateUrl: './reserva-lista.component.html',
  styleUrl: './reserva-lista.component.css',
  imports: [TableComponent],
})
export class ReservaListaComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reservas }) => {
      this.listado = reservas.map((reserva: ReservaModel) => {
        return {
          servicio: reserva?.servicio?.nombre,
          residente: reserva?.residente?.nombre,
          identificacion: reserva?.residente?.identificacion,
          dia: reserva?.createdAt,
          hora: reserva?.hora,
        };
      });
    });
  }

  redirigirCrearReserva() {
    this.router.navigateByUrl('reserva-crear');
  }
}
