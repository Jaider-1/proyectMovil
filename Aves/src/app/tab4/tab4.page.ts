import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4', // Nombre del componente que se usa en el HTML
  templateUrl: 'tab4.page.html', // Archivo de plantilla HTML asociado
  styleUrls: ['tab4.page.scss'], // Estilos específicos del componente
})
export class Tab4Page {
  especies: any[] = []; // Arreglo para almacenar las especies que se gestionan
  especieSeleccionada: any = null; // Objeto temporal para manejar la edición de una especie

  constructor(private alertController: AlertController) {
    // Método que se ejecuta cuando se crea el componente
    this.cargarEspecies(); // Se cargan las especies almacenadas en el Local Storage
  }

  // Método para cargar las especies almacenadas en el Local Storage
  cargarEspecies() {
    const data = localStorage.getItem('especies'); // Obtener los datos en formato JSON desde el Local Storage
    this.especies = data ? JSON.parse(data) : []; // Si hay datos, se parsean; si no, se inicializa el arreglo vacío
  }

  // Método para mostrar un mensaje de alerta con título y mensaje personalizados
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo, // Título del mensaje
      message: mensaje, // Mensaje del cuerpo
      buttons: ['OK'], // Botón de confirmación
    });
    await alert.present(); // Mostrar el mensaje
  }

  // Método para guardar las especies en el Local Storage
  guardarEnLocalStorage() {
    // Convierte el arreglo de especies a formato JSON y lo almacena
    localStorage.setItem('especies', JSON.stringify(this.especies));
  }

  // Método para eliminar una especie del arreglo usando su ID
  eliminarEspecie(id: string) {
    // Filtrar el arreglo para eliminar la especie con el ID indicado
    this.especies = this.especies.filter((especie) => especie.id !== id);
    this.guardarEnLocalStorage(); // Actualizar los datos en el Local Storage
    this.limpiarFormulario(); // Resetear el formulario
  }

  // Método para guardar o actualizar una especie
  guardarEspecie() {
    const nombreCientifico = (
      document.getElementById('nombreCientifico') as HTMLInputElement
    ).value; // Obtener el valor del campo "nombre científico"
    const nombreComun = (
      document.getElementById('nombreComun') as HTMLInputElement
    ).value; // Obtener el valor del campo "nombre común"
    const descripcion = (
      document.getElementById('descripcion') as HTMLTextAreaElement
    ).value; // Obtener el valor del campo "descripción"

    // Validación: los campos no deben estar vacíos
    if (!nombreCientifico || !nombreComun || !descripcion) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (this.especieSeleccionada) {
      // Si hay una especie seleccionada, se actualiza
      this.especieSeleccionada.nombreCientifico = nombreCientifico;
      this.especieSeleccionada.nombreComun = nombreComun;
      this.especieSeleccionada.descripcion = descripcion;
      this.especieSeleccionada = null; // Desmarcar la especie seleccionada
    } else {
      // Si no hay especie seleccionada, se genera una nueva
      const nuevoId =
        this.especies.length > 0
          ? Math.max(...this.especies.map((e) => +e.id)) + 1 // Calcular el nuevo ID
          : 1;

      // Agregar la nueva especie al arreglo
      this.especies.push({
        id: nuevoId.toString(), // Asignar el nuevo ID como string
        nombreCientifico,
        nombreComun,
        descripcion,
      });
    }

    this.guardarEnLocalStorage(); // Guardar los datos en el Local Storage
    this.limpiarFormulario(); // Limpiar los campos del formulario
  }

  // Método para limpiar los campos del formulario
  limpiarFormulario() {
    // Calcular el próximo ID de la especie
    const nuevoId =
      this.especies.length > 0
        ? Math.max(...this.especies.map((e) => +e.id)) + 1
        : 1;

    // Asignar el nuevo ID al campo correspondiente (aunque sea de solo lectura)
    (document.getElementById('idEspecie') as HTMLInputElement).value =
      nuevoId.toString();
    (document.getElementById('nombreCientifico') as HTMLInputElement).value =
      ''; // Limpiar campo "nombre científico"
    (document.getElementById('nombreComun') as HTMLInputElement).value = ''; // Limpiar campo "nombre común"
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = ''; // Limpiar campo "descripción"

    this.especieSeleccionada = null; // Resetear la especie seleccionada
  }

  // Método para editar una especie existente
  editarEspecie(especie: any) {
    this.especieSeleccionada = especie; // Asignar la especie seleccionada

    // Llenar los campos del formulario con los datos de la especie seleccionada
    (document.getElementById('idEspecie') as HTMLInputElement).value =
      especie.id;
    (document.getElementById('nombreCientifico') as HTMLInputElement).value =
      especie.nombreCientifico;
    (document.getElementById('nombreComun') as HTMLInputElement).value =
      especie.nombreComun;
    (document.getElementById('descripcion') as HTMLTextAreaElement).value =
      especie.descripcion;
  }
}
