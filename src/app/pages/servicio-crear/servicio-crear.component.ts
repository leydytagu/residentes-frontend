import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { mostrarError } from '../../core/helpers/utils';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-servicio-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './servicio-crear.component.html',
  styleUrl: './servicio-crear.component.css',
})
export class ServicioCrearComponent implements OnInit {
  crearServicioForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.crearServicioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      apertura: ['', [Validators.required]],
      cierre: ['', [Validators.required]],
      dias: ['', [Validators.required]],
      encargado: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  crearServicio() {
    if (this.crearServicioForm.valid) {
      this.serviciosService
        .crearServicio(this.crearServicioForm.value)
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Servicio creado',
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
