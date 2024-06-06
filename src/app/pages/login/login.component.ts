import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ResidentesService } from '../../services/residentes.service';
import { PATH } from '../../core/enum/path.enum';
import { LoginInterface } from '../../core/interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  islogin: boolean;

  private formBuilder = inject(FormBuilder);
  private residentesService = inject(ResidentesService);
  private router = inject(Router);

  get formlogin() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  iniciarSesion() {
    this.islogin = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    const loginData: LoginInterface = {
      email: data.correo,
      password: data.contrasena,
    };

    this.residentesService.login(loginData).subscribe({
      next: (resp: any) => {
        if (resp && resp.usuario) {
          const { nombre, correo, telefono } = resp.usuario;
          Swal.fire({
            html: `Bienvenido ${nombre}`,
            icon: 'warning',
          }).then(() => {
            this.router.navigateByUrl(PATH.HOME);
          });
        }
      },
      error: (error: any) => {
        console.error(error.error.msg);
      },
    });
  }
}
