import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  // Variables para capturar las selecciones
  tipoHabitat: string = '';
  clima: string = '';
  vegetacion: string = '';

  // Array para guardar los datos en la tabla
  datos: Array<{ tipoHabitat: string; clima: string; vegetacion: string }> = [];

  constructor() {}

  // Función para guardar los datos seleccionados
  guardarSeleccion() {
    if (this.tipoHabitat && this.clima && this.vegetacion) {
      this.datos.push({
        tipoHabitat: this.tipoHabitat,
        clima: this.clima,
        vegetacion: this.vegetacion,
      });
      // Limpiar los selectores después de guardar
      this.tipoHabitat = '';
      this.clima = '';
      this.vegetacion = '';
    } else {
      alert('Por favor selecciona todas las opciones antes de guardar.');
    }
  }
}
