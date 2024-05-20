import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-residente-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './residente-crear.component.html',
  styleUrl: './residente-crear.component.css',
})
export class ResidenteCrearComponent implements OnInit {
  crearResidenteForm: FormGroup;
  private formBuilder = inject(FormBuilder);

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
    console.log(this.crearResidenteForm.value);
  }
}
