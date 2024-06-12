import { Component, inject, OnInit } from '@angular/core';
import { ResidentesService } from '../../services/residentes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  nombreUsuario: string;

  private residentesService = inject(ResidentesService);

  ngOnInit() {
    this.nombreUsuario = this.residentesService.usuario?.nombre;
  }
}
