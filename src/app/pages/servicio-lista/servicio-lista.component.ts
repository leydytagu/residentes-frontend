import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { PATH } from '../../core/enum/path.enum';
import Swal from 'sweetalert2';
import { mostrarError } from '../../core/helpers/utils';
import { ServiciosService } from '../../services/servicios.service';
import { ServicioModel } from '../../core/models/servicio.model';

@Component({
  selector: 'app-servicio-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './servicio-lista.component.html',
  styleUrl: './servicio-lista.component.css',
})
export class ServicioListaComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private serviciosService = inject(ServiciosService);

  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ servicios }) => {
      this.listado = servicios.map((servicio: ServicioModel) => {
        return {
          _id: servicio?._id,
          nombre: servicio?.nombre,
          descripcion: servicio?.descripcion,
          apertura: servicio?.apertura,
          cierre: servicio?.cierre,
          dias: servicio?.dias,
          encargado: servicio?.encargado,
        };
      });
    });
  }

  redirigirCrearServicio() {
    this.router.navigateByUrl(PATH.SERVICIO_CREAR);
  }

  redireccionarEditar(servicio: ServicioModel) {
    this.router.navigateByUrl(`${PATH.SERVICIO_DETALLE}/${servicio?._id}`);
  }

  eliminarServicio(servicio: ServicioModel) {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el servicio ${servicio.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.eliminarServicio(servicio?._id).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: `Servicio ${servicio.nombre} eliminado`,
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
