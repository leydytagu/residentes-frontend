import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() lista: any[] = [];

  get columnas(): string[] {
    if (this.lista.length > 0) {
      return Object.keys(this.lista[0]);
    }
    return [];
  }
}
