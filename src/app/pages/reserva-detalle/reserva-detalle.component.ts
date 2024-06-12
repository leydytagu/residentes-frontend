import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservaModel } from '../../core/models/reserva.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';
import { mostrarError } from '../../core/helpers/utils';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { ServiciosService } from '../../services/servicios.service';
import { ServicioModel } from '../../core/models/servicio.model';

@Component({
  selector: 'app-reserva-detalle',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reserva-detalle.component.html',
  styleUrl: './reserva-detalle.component.css',
})
export class ReservaDetalleComponent implements OnInit {
  reserva: ReservaModel;
  servicios: ServicioModel[] = [];
  actualizarReservaForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private reservasService = inject(ReservasService);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reservasService.getReserva(id).subscribe({
        next: (resp: any) => {
          this.reserva = resp;
          this.actualizarReservaForm = this.formBuilder.group({
            residente: [this.reserva.residente, [Validators.required]],
            servicio: [this.reserva.servicio, [Validators.required]],
            hora: [this.reserva.hora, [Validators.required]],
            comentarios: [this.reserva.comentarios],
          });
        },
        error: (error: any) => {
          mostrarError(error);
        },
      });
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

  actualizarReserva() {
    if (this.actualizarReservaForm.valid) {
      this.reservasService
        .actualizarReserva(this.reserva._id, this.actualizarReservaForm.value)
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Reserva actualizado',
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
