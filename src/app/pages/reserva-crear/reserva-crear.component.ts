import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { mostrarError } from '../../core/helpers/utils';
import { ResidentesService } from '../../services/residentes.service';
import { ServiciosService } from '../../services/servicios.service';
import { ServicioModel } from '../../core/models/servicio.model';

@Component({
  selector: 'app-reserva-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reserva-crear.component.html',
  styleUrl: './reserva-crear.component.css',
})
export class ReservaCrearComponent implements OnInit {
  servicios: ServicioModel[] = [];
  crearReservaForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private reservasService = inject(ReservasService);
  private residentesService = inject(ResidentesService);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.crearReservaForm = this.formBuilder.group({
      residente: [this.residentesService.usuario?._id, [Validators.required]],
      servicio: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      comentarios: [''],
    });

    this.serviciosService.getServicios().subscribe({
      next: (resp: any) => {
        this.servicios = resp;
      },
      error: (error: any) => {
        mostrarError(error);
      },
    });
  }

  crearReserva() {
    if (this.crearReservaForm.valid) {
      this.reservasService.crearReserva(this.crearReservaForm.value).subscribe({
        next: (resp: any) => {
          Swal.fire({
            title: 'Reserva creado',
            html: ` ${resp.msg}`,
            icon: 'success',
          }).then(() => {
            this.router.navigateByUrl(PATH.RESERVA_LISTA);
          });
        },
        error: (error: any) => {
          mostrarError(error);
        },
      });
    } else {
      Swal.fire({
        title: 'El formulario no es valido',
        icon: 'warning',
      });
    }
  }
}
