import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  especies: any[] = []; // Arreglo para almacenar las especies
  especieSeleccionada: any = null; // Especie que se está editando

  constructor(private alertController: AlertController) {
    this.cargarEspecies(); // Cargar especies al iniciar la página
  }

  // Cargar datos desde Local Storage
  cargarEspecies() {
    const data = localStorage.getItem('especies');
    this.especies = data ? JSON.parse(data) : [];
  }

  // Guardar nueva especie o actualizar una existente
 
  // Mostrar mensaje de alerta
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Guardar datos en Local Storage
  guardarEnLocalStorage() {
    localStorage.setItem('especies', JSON.stringify(this.especies));
  }



  // Eliminar una especie
  eliminarEspecie(id: string) {
    this.especies = this.especies.filter(especie => especie.id !== id);
    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

 
  

  guardarEspecie() {
    const nombreCientifico = (document.getElementById('nombreCientifico') as HTMLInputElement).value;
    const nombreComun = (document.getElementById('nombreComun') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

    // Validar si los campos están vacíos
    if (!nombreCientifico || !nombreComun || !descripcion) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (this.especieSeleccionada) {
      // Actualizar especie existente
      this.especieSeleccionada.nombreCientifico = nombreCientifico;
      this.especieSeleccionada.nombreComun = nombreComun;
      this.especieSeleccionada.descripcion = descripcion;
      this.especieSeleccionada = null;
    } else {
      // Generar ID automáticamente
      const nuevoId = this.especies.length > 0 
        ? Math.max(...this.especies.map(e => +e.id)) + 1 // Obtener el mayor ID y sumar 1
        : 1;

      // Añadir nueva especie
      this.especies.push({ id: nuevoId.toString(), nombreCientifico, nombreComun, descripcion });
    }

    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    // Calcular el próximo ID
    const nuevoId = this.especies.length > 0
      ? Math.max(...this.especies.map(e => +e.id)) + 1 // Obtener el mayor ID y sumar 1
      : 1;

    // Establecer el ID calculado en el campo, pero bloqueado
    (document.getElementById('idEspecie') as HTMLInputElement).value = nuevoId.toString();
    (document.getElementById('nombreCientifico') as HTMLInputElement).value = '';
    (document.getElementById('nombreComun') as HTMLInputElement).value = '';
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = '';

    this.especieSeleccionada = null; // Resetear la especie seleccionada
  }


  editarEspecie(especie: any) {
    this.especieSeleccionada = especie;

    // Mostrar el ID existente
    (document.getElementById('idEspecie') as HTMLInputElement).value = especie.id;
    (document.getElementById('nombreCientifico') as HTMLInputElement).value = especie.nombreCientifico;
    (document.getElementById('nombreComun') as HTMLInputElement).value = especie.nombreComun;
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = especie.descripcion;
  }





}

