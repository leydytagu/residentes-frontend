import { Component, OnInit } from '@angular/core';
import { MenuRoutes } from '../../core/enum/menu.enum';
import { MenuInterface } from '../../core/interfaces/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  menuItems: MenuInterface[] = [];

  ngOnInit(): void {
    this.menuItems = MenuRoutes;
    console.log(this.menuItems);
  }
}
