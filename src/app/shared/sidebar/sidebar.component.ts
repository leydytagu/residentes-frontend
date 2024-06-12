import { Component, inject, OnInit } from '@angular/core';
import { MenuRoutes } from '../../core/enum/menu.enum';
import { MenuInterface } from '../../core/interfaces/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ResidentesService } from '../../services/residentes.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  nombreUsuario: string;
  menuItems: MenuInterface[] = [];

  private residentesService = inject(ResidentesService);

  ngOnInit(): void {
    this.menuItems = MenuRoutes;
    this.nombreUsuario = this.residentesService.usuario?.nombre;
  }

  cerrarSesion() {
    this.residentesService.logout();
  }
}
