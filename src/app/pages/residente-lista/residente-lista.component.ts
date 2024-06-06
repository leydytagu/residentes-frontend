import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenteModel } from '../../core/models/residente.model';
import { PATH } from '../../core/enum/path.enum';

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

  public listado = [];

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ residentes }) => {
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
}
