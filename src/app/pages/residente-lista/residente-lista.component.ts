import { Component, inject } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residente-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './residente-lista.component.html',
  styleUrl: './residente-lista.component.css',
})
export class ResidenteListaComponent {
  router = inject(Router);

  public listado = [
    {
      nombre: 'Juan',
      apellido: 'Martinez',
      celular: '312354387',
      correo: 'juan.martinez@gmail.com',
      apartamento: 194,
    },
    {
      nombre: 'Paola',
      apellido: 'Lopez',
      celular: '432736543',
      correo: 'paola.lopez@gmail.com',
      apartamento: 298,
    },
  ];

  redirigirCrearResidente() {
    this.router.navigateByUrl('residente-crear');
    console.log('se redirigio correctamente');
  }
}
