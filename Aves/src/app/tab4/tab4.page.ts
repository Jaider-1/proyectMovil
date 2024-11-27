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
  async guardarEspecie() {
    const id = (document.getElementById('idEspecie') as HTMLInputElement).value;
    const nombreCientifico = (document.getElementById('nombreCientifico') as HTMLInputElement).value;
    const nombreComun = (document.getElementById('nombreComun') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

    // Validar si alguno de los campos está vacío
    if (!id || !nombreCientifico || !nombreComun || !descripcion) {
      await this.mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (this.especieSeleccionada) {
      // Actualizar especie existente
      this.especieSeleccionada.id = id;
      this.especieSeleccionada.nombreCientifico = nombreCientifico;
      this.especieSeleccionada.nombreComun = nombreComun;
      this.especieSeleccionada.descripcion = descripcion;
      this.especieSeleccionada = null;
    } else {
      // Añadir nueva especie
      this.especies.push({ id, nombreCientifico, nombreComun, descripcion });
    }

    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

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

  // Editar una especie
  editarEspecie(especie: any) {
    this.especieSeleccionada = especie;
    (document.getElementById('idEspecie') as HTMLInputElement).value = especie.id;
    (document.getElementById('nombreCientifico') as HTMLInputElement).value = especie.nombreCientifico;
    (document.getElementById('nombreComun') as HTMLInputElement).value = especie.nombreComun;
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = especie.descripcion;
  }

  // Eliminar una especie
  eliminarEspecie(id: string) {
    this.especies = this.especies.filter(especie => especie.id !== id);
    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

  // Limpiar formulario
  limpiarFormulario() {
    (document.getElementById('idEspecie') as HTMLInputElement).value = '';
    (document.getElementById('nombreCientifico') as HTMLInputElement).value = '';
    (document.getElementById('nombreComun') as HTMLInputElement).value = '';
    (document.getElementById('descripcion') as HTMLTextAreaElement).value = '';
  }
}
