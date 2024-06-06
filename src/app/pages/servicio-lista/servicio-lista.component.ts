import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ResidenteModel } from '../../core/models/residente.model';
import { ServicioModel } from '../../core/models/servicio.model';
import { PATH } from '../../core/enum/path.enum';

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

  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ servicios }) => {
      this.listado = servicios.map((servicio: ServicioModel) => {
        return {
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
}
