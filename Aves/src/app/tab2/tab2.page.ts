// Importación de la clase Component de Angular para crear un componente
import { Component } from '@angular/core';

// Decorador Component que define las configuraciones del componente Tab2Page
@Component({
  selector: 'app-tab2', // Selector del componente, utilizado en las plantillas para insertar este componente
  templateUrl: 'tab2.page.html', // Enlace a la plantilla HTML del componente
  styleUrls: ['tab2.page.scss'], // Enlace a los archivos de estilo (CSS/SCSS) del componente
})
export class Tab2Page {
  // Variables que almacenan las selecciones del usuario
  tipoHabitat: string = ''; // Tipo de hábitat seleccionado por el usuario
  clima: string = ''; // Clima seleccionado por el usuario
  vegetacion: string = ''; // Tipo de vegetación seleccionado por el usuario

  // Array que guarda los datos de los registros ingresados (tarjetas)
  datos: Array<{ id: number; tipoHabitat: string; clima: string; vegetacion: string }> = [];

  // Variable que gestiona el ID del próximo registro
  idLugarHabitado: number = 1; // Inicializa el ID en 1 (o el valor correspondiente al primer ID)

  constructor() {
    // Cargar los datos almacenados en el LocalStorage al iniciar el componente
    const datosGuardados = localStorage.getItem('datosHabitat');
    if (datosGuardados) {
      // Si existen datos guardados, los convierte de JSON a un array y lo asigna a 'datos'
      this.datos = JSON.parse(datosGuardados);
      // Actualiza el ID del siguiente registro basado en el valor máximo de los IDs existentes
      if (this.datos.length > 0) {
        this.idLugarHabitado = Math.max(...this.datos.map(item => item.id)) + 1;
      }
    }
  }

  // Función para obtener el siguiente ID disponible para un nuevo registro
  obtenerProximoId(): number {
    return this.idLugarHabitado; // Retorna el ID actual para usarlo en el siguiente registro
  }

  // Función que guarda la selección del usuario como un nuevo registro
  guardarSeleccion() {
    // Verifica si el usuario ha seleccionado todas las opciones antes de guardar
    if (this.tipoHabitat && this.clima && this.vegetacion) {
      // Crea un nuevo objeto con los datos del usuario
      const nuevoDato = {
        id: this.obtenerProximoId(), // Utiliza el ID generado
        tipoHabitat: this.tipoHabitat,
        clima: this.clima,
        vegetacion: this.vegetacion,
      };

      // Añade el nuevo registro al array de 'datos'
      this.datos.push(nuevoDato);

      // Incrementa el ID para el próximo registro
      this.idLugarHabitado++;

      // Guarda los datos actualizados en el LocalStorage
      this.actualizarLocalStorage();

      // Limpia los campos de selección después de guardar los datos
      this.tipoHabitat = '';
      this.clima = '';
      this.vegetacion = '';
    } else {
      // Si no se han seleccionado todas las opciones, muestra una alerta
      alert('Por favor selecciona todas las opciones antes de guardar.');
    }
  }

  // Función para eliminar un registro de los datos
  eliminarDato(id: number) {
    // Filtra el array 'datos' para eliminar el registro con el ID especificado
    this.datos = this.datos.filter((item) => item.id !== id);

    // Después de eliminar, actualiza el ID para reflejar el valor correcto del próximo registro
    this.idLugarHabitado = Math.max(...this.datos.map(item => item.id)) + 1;

    // Actualiza los datos en LocalStorage
    this.actualizarLocalStorage();
  }

  // Función para editar un registro
  editarDato(id: number) {
    // Busca el registro que se quiere editar
    const datoEditar = this.datos.find((item) => item.id === id);
    if (datoEditar) {
      // Si el registro existe, asigna los valores a los campos de selección
      this.tipoHabitat = datoEditar.tipoHabitat;
      this.clima = datoEditar.clima;
      this.vegetacion = datoEditar.vegetacion;

      // Elimina el registro para actualizarlo con los nuevos valores
      this.eliminarDato(id);
    }
  }

  // Función para actualizar los datos guardados en LocalStorage
  actualizarLocalStorage() {
    // Convierte el array 'datos' a una cadena JSON y lo guarda en LocalStorage
    localStorage.setItem('datosHabitat', JSON.stringify(this.datos));
  }
}
