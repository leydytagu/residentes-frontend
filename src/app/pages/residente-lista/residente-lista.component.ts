import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenteModel } from '../../core/models/residente.model';
import { PATH } from '../../core/enum/path.enum';
import Swal from 'sweetalert2';
import { ResidentesService } from '../../services/residentes.service';
import { mostrarError } from '../../core/helpers/utils';

@Component({
  selector: 'app-residente-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './residente-lista.component.html',
  styleUrl: './residente-lista.component.css',
})
export class ResidenteListaComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private residentesService = inject(ResidentesService);

  public residentes: ResidenteModel[] = [];
  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ residentes }) => {
      this.residentes = residentes;
      this.listado = residentes.map((residente: ResidenteModel) => {
        return {
          identificacion: residente?.identificacion,
          nombre: residente?.nombre,
          apellido: residente?.apellido,
          celular: residente?.celular,
          correo: residente?.correo,
          apartamento: residente?.apartamento,
        };
      });
    });
  }

  redirigirCrearResidente() {
    this.router.navigateByUrl(PATH.RESIDENTE_CREAR);
  }

  redireccionarEditar() {
    this.router.navigateByUrl(PATH.RESIDENTE_LISTA);
  }

  eliminarResidente(residente: ResidenteModel) {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el residente ${residente.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const residenteEncontrado: ResidenteModel | undefined =
          this.residentes.find(
            (item) => item.identificacion === residente.identificacion
          );
        if (residenteEncontrado) {
          this.residentesService
            .eliminarResidente(residenteEncontrado?._id)
            .subscribe({
              next: (resp: any) => {
                Swal.fire({
                  title: `Residente ${residenteEncontrado.nombre} eliminado`,
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
      }
    });
  }
}
