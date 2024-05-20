import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-servicio-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './servicio-crear.component.html',
  styleUrl: './servicio-crear.component.css',
})
export class ServicioCrearComponent implements OnInit {
  crearServicioForm: FormGroup;
  private formBuilder = inject(FormBuilder);

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
    console.log(this.crearServicioForm.value);
  }
}
