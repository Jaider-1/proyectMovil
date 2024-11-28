import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  // Variables para capturar las selecciones del usuario
  tipoHabitat: string = '';
  clima: string = '';
  vegetacion: string = '';

  // Array para guardar los datos de las tarjetas (registros)
  datos: Array<{ id: number; tipoHabitat: string; clima: string; vegetacion: string }> = [];

  // Variable para gestionar el ID del siguiente registro
  idLugarHabitado: number = 1; // Comienza en 1 o el valor que corresponda

  constructor() {
    // Cargar datos guardados en el LocalStorage al iniciar la aplicación
    const datosGuardados = localStorage.getItem('datosHabitat');
    if (datosGuardados) {
      this.datos = JSON.parse(datosGuardados);
      // Actualizar el ID con el valor máximo de los datos cargados
      if (this.datos.length > 0) {
        this.idLugarHabitado = Math.max(...this.datos.map(item => item.id)) + 1;
      }
    }
  }

  // Función para obtener el siguiente ID disponible para los registros
  obtenerProximoId(): number {
    // Devuelve el ID actual para que se use en el nuevo registro
    return this.idLugarHabitado;
  }

  // Función para guardar la selección del usuario
  guardarSeleccion() {
    // Verificar si se han seleccionado todas las opciones
    if (this.tipoHabitat && this.clima && this.vegetacion) {
      // Crear un nuevo registro con el ID actual
      const nuevoDato = {
        id: this.obtenerProximoId(), // Usar el ID generado
        tipoHabitat: this.tipoHabitat,
        clima: this.clima,
        vegetacion: this.vegetacion,
      };

      // Añadir el nuevo dato al array de datos
      this.datos.push(nuevoDato);

      // Incrementar el ID para el siguiente registro
      this.idLugarHabitado++;

      // Guardar los datos actualizados en el LocalStorage
      this.actualizarLocalStorage();

      // Limpiar los campos de selección después de guardar el registro
      this.tipoHabitat = '';
      this.clima = '';
      this.vegetacion = '';
    } else {
      // Avisar si no se han completado todas las opciones
      alert('Por favor selecciona todas las opciones antes de guardar.');
    }
  }

  // Función para eliminar un registro de los datos
  eliminarDato(id: number) {
    // Filtrar los datos para eliminar el registro con el ID especificado
    this.datos = this.datos.filter((item) => item.id !== id);

    // Después de eliminar, actualizar el ID para que siempre tenga el valor correcto
    this.idLugarHabitado = Math.max(...this.datos.map(item => item.id)) + 1;

    // Actualizar los datos en el LocalStorage
    this.actualizarLocalStorage();
  }

  // Función para editar un registro
  editarDato(id: number) {
    // Buscar el registro que se quiere editar
    const datoEditar = this.datos.find((item) => item.id === id);
    if (datoEditar) {
      // Rellenar los campos de selección con los valores del registro encontrado
      this.tipoHabitat = datoEditar.tipoHabitat;
      this.clima = datoEditar.clima;
      this.vegetacion = datoEditar.vegetacion;

      // Eliminar el registro editado para actualizarlo
      this.eliminarDato(id);
    }
  }

  // Función para actualizar los datos guardados en LocalStorage
  actualizarLocalStorage() {
    // Guardar los datos en LocalStorage como un JSON
    localStorage.setItem('datosHabitat', JSON.stringify(this.datos));
  }
}
