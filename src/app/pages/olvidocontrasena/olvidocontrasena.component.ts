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
import {
  LoginInterface,
  OlvidoInterface,
} from '../../core/interfaces/login.interface';

@Component({
  selector: 'app-olvidocontrasena',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './olvidocontrasena.component.html',
  styleUrl: './olvidocontrasena.component.css',
})
export class OlvidocontrasenaComponent implements OnInit {
  olvidoForm: FormGroup;
  isolvido: boolean;

  private formBuilder = inject(FormBuilder);
  private residentesService = inject(ResidentesService);
  private router = inject(Router);

  get formolvido() {
    return this.olvidoForm.controls;
  }

  ngOnInit(): void {
    this.olvidoForm = this.formBuilder.group({
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      numeroDocumento: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  olvidoContrasena() {
    this.isolvido = true;

    /*if (this.olvidoForm.invalid) {
      Swal.fire({
        html: `Formulario Invalido`,
        icon: 'warning',
      });
      return;
    }*/

    const data = this.olvidoForm.value;

    const olvidoData: OlvidoInterface = {
      email: data.correo,
      numeroDocumento: data.numeroDocumento,
    };

    this.residentesService.olvidoContrasena(olvidoData).subscribe({
      next: (resp: any) => {
        Swal.fire({
          html: 'Hemos enviado un mensaje de recuperacion a tu correo',
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
