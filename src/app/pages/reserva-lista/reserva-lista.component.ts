import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaModel } from '../../core/models/reserva.model';
import { ReservasService } from '../../services/reservas.service';
import { PATH } from '../../core/enum/path.enum';
import Swal from 'sweetalert2';
import { mostrarError } from '../../core/helpers/utils';

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
  private reservasService = inject(ReservasService);

  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reservas }) => {
      this.listado = reservas.map((reserva: ReservaModel) => {
        return {
          _id: reserva?._id,
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
    this.router.navigateByUrl(PATH.RESERVA_CREAR);
  }

  redireccionarEditar(reserva: ReservaModel) {
    this.router.navigateByUrl(`${PATH.RESERVA_DETALLE}/${reserva?._id}`);
  }

  eliminarReserva(reserva: ReservaModel) {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el reserva?`,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasService.eliminarReserva(reserva?._id).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: `Reserva eliminada`,
              icon: 'success',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (error: any) => {
            mostrarError(error);
          },
        });
      }
    });
  }
}
