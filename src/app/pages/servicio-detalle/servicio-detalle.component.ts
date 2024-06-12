import { Component, inject, OnInit } from '@angular/core';
import { ServicioModel } from '../../core/models/servicio.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { mostrarError } from '../../core/helpers/utils';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';

@Component({
  selector: 'app-servicio-detalle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './servicio-detalle.component.html',
  styleUrl: './servicio-detalle.component.css',
})
export class ServicioDetalleComponent implements OnInit {
  servicio: ServicioModel;
  actualizarServicioForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.serviciosService.getServicio(id).subscribe({
        next: (resp: any) => {
          this.servicio = resp;
          this.actualizarServicioForm = this.formBuilder.group({
            nombre: [this.servicio.nombre, [Validators.required]],
            descripcion: [this.servicio.descripcion, [Validators.required]],
            apertura: [this.servicio.apertura, [Validators.required]],
            cierre: [this.servicio.cierre, [Validators.required]],
            dias: [this.servicio.dias, [Validators.required]],
            encargado: [this.servicio.encargado, [Validators.required]],
            estado: [this.servicio.estado, [Validators.required]],
          });
        },
        error: (error: any) => {
          mostrarError(error);
        },
      });
    });
  }

  actualizarServicio() {
    if (this.actualizarServicioForm.valid) {
      this.serviciosService
        .actualizarServicio(
          this.servicio._id,
          this.actualizarServicioForm.value
        )
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Servicio actualizado',
              html: ` ${resp.msg}`,
              icon: 'success',
            }).then(() => {
              this.router.navigateByUrl(PATH.SERVICIO_LISTA);
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
