import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reserva-crear',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reserva-crear.component.html',
  styleUrl: './reserva-crear.component.css',
})
export class ReservaCrearComponent implements OnInit {
  crearReservaForm: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.crearReservaForm = this.formBuilder.group({
      idResidente: ['', [Validators.required]],
      idServicio: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      comentarios: [''],
    });
  }

  crearReserva() {
    console.log(this.crearReservaForm.value);
  }
}
