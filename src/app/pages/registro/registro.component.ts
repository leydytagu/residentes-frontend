import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResidentesService } from '../../services/residentes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
import { mostrarError } from '../../core/helpers/utils';
import { ResidenteModel } from '../../core/models/residente.model';
import { RegistroInterface } from '../../core/interfaces/login.interface';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  isregistro: boolean;

  private formBuilder = inject(FormBuilder);
  private residentesService = inject(ResidentesService);
  private router = inject(Router);

  get formregistro() {
    return this.registroForm.controls;
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      apartamento: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  iniciarSesion() {
    this.isregistro = true;

    /*if (this.registroForm.invalid) {
      Swal.fire({
        html: `Formulario Invalido`,
        icon: 'warning',
      });
      return;
    }*/

    const data = this.registroForm.value;

    const registroData: RegistroInterface = {
      nombre: data.nombre,
      apellido: data.apellido,
      identificacion: data.identificacion,
      celular: data.celular,
      correo: data.correo,
      apartamento: data.apartamento,
      password: data.password,
    };

    this.residentesService
      .crearResidente(registroData as ResidenteModel)
      .subscribe({
        next: (resp: any) => {
          Swal.fire({
            html: 'Registro exitoso',
            icon: 'success',
          }).then(() => {
            this.router.navigateByUrl(PATH.LOGIN);
          });
        },
        error: (error: any) => {
          mostrarError(error);
        },
      });
  }

  redirectIniciarSesion(): void {
    this.router.navigateByUrl(PATH.LOGIN);
  }
}
