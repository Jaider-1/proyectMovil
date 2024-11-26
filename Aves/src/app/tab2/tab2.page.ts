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
  datos: Array<{ id: number; tipoHabitat: string; clima: string; vegetacion: string }> = [];

  constructor() {
    // Cargar datos del LocalStorage al iniciar
    const datosGuardados = localStorage.getItem('datosHabitat');
    if (datosGuardados) {
      this.datos = JSON.parse(datosGuardados);
    }
  }

  // Función para guardar los datos seleccionados
  guardarSeleccion() {
    if (this.tipoHabitat && this.clima && this.vegetacion) {
      const nuevoDato = {
        id: new Date().getTime(), // Genera un ID único basado en el tiempo
        tipoHabitat: this.tipoHabitat,
        clima: this.clima,
        vegetacion: this.vegetacion,
      };
      this.datos.push(nuevoDato);

      // Guardar en LocalStorage
      this.actualizarLocalStorage();

      // Limpiar los selectores después de guardar
      this.tipoHabitat = '';
      this.clima = '';
      this.vegetacion = '';
    } else {
      alert('Por favor selecciona todas las opciones antes de guardar.');
    }
  }

  // Función para eliminar un registro por su ID
  eliminarDato(id: number) {
    this.datos = this.datos.filter((item) => item.id !== id);

    // Actualizar LocalStorage
    this.actualizarLocalStorage();
  }

  // Función para editar un registro
  editarDato(id: number) {
    const datoEditar = this.datos.find((item) => item.id === id);
    if (datoEditar) {
      this.tipoHabitat = datoEditar.tipoHabitat;
      this.clima = datoEditar.clima;
      this.vegetacion = datoEditar.vegetacion;

      // Eliminar el dato editado para actualizarlo
      this.eliminarDato(id);
    }
  }

  // Actualizar LocalStorage con los datos actuales
  actualizarLocalStorage() {
    localStorage.setItem('datosHabitat', JSON.stringify(this.datos));
  }
}
