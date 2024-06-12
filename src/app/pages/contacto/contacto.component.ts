import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';
import { ResidentesService } from '../../services/residentes.service';
import { mostrarError } from '../../core/helpers/utils';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {
  crearContactoForm: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private reservasService = inject(ReservasService);
  private residentesService = inject(ResidentesService);

  ngOnInit(): void {
    this.crearContactoForm = this.formBuilder.group({
      residente: [this.residentesService.usuario?._id, [Validators.required]],
      asunto: ['', [Validators.required]],
      mensaje: ['', [Validators.required]],
    });
  }

  crearContacto() {
    if (this.crearContactoForm.valid) {
      this.reservasService.contacto(this.crearContactoForm.value).subscribe({
        next: (resp: any) => {
          Swal.fire({
            title: 'Mensaje enviado!',
            html: ` ${resp.msg}`,
            icon: 'success',
          }).then(() => {
            this.router.navigateByUrl(PATH.HOME);
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
