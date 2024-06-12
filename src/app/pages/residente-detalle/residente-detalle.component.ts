import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentesService } from '../../services/residentes.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { mostrarError } from '../../core/helpers/utils';
import { ResidenteModel } from '../../core/models/residente.model';

@Component({
  selector: 'app-residente-detalle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './residente-detalle.component.html',
  styleUrl: './residente-detalle.component.css',
})
export class ResidenteDetalleComponent implements OnInit {
  residente: ResidenteModel;
  actualizarResidenteForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private residentesService = inject(ResidentesService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.residentesService.getResidente(id).subscribe({
        next: (resp: any) => {
          this.residente = resp;
          this.actualizarResidenteForm = this.formBuilder.group({
            nombre: [this.residente.nombre, [Validators.required]],
            apellido: [this.residente.apellido, [Validators.required]],
            identificacion: [
              this.residente.identificacion,
              [Validators.required],
            ],
            celular: [this.residente.celular, [Validators.required]],
            correo: [this.residente.correo, [Validators.required]],
            apartamento: [this.residente.apartamento, [Validators.required]],
          });
        },
        error: (error: any) => {
          mostrarError(error);
        },
      });
    });
  }

  actualizarResidente() {
    if (this.actualizarResidenteForm.valid) {
      this.residentesService
        .actualizarResidente(
          this.residente._id,
          this.actualizarResidenteForm.value
        )
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Residente actualizado',
              html: ` ${resp.msg}`,
              icon: 'success',
            }).then(() => {
              this.router.navigateByUrl(PATH.RESIDENTE_LISTA);
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
