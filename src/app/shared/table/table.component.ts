import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() lista: any[] = [];
  @Input() mostrarAcciones: boolean = false;

  @Output() onEditar: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEliminar: EventEmitter<any> = new EventEmitter<any>();

  get columnas(): string[] {
    if (this.lista.length > 0) {
      return Object.keys(this.lista[0]).map(
        (columna) => columna.charAt(0).toUpperCase() + columna.slice(1)
      );
    }
    return [];
  }

  editar(data: any) {
    this.onEditar.emit(data);
  }

  eliminar(data: any) {
    this.onEliminar.emit(data);
  }
}
