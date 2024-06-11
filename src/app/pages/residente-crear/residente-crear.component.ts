import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResidentesService } from '../../services/residentes.service';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { Router } from '@angular/router';
import { mostrarError } from '../../core/helpers/utils';

@Component({
  selector: 'app-residente-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './residente-crear.component.html',
  styleUrl: './residente-crear.component.css',
})
export class ResidenteCrearComponent implements OnInit {
  crearResidenteForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private residentesService = inject(ResidentesService);

  ngOnInit(): void {
    this.crearResidenteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      apartamento: ['', [Validators.required]],
    });
  }

  crearResidente() {
    if (this.crearResidenteForm.valid) {
      this.residentesService
        .crearResidente(this.crearResidenteForm.value)
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Residente creado',
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
