// Archivo: tab3.page.ts
// Componente Angular para gestionar municipios en Ionic

import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Interfaz para definir la estructura básica de un municipio
interface Municipio {
  id: number; // Identificador único del municipio
  nombre: string; // Nombre del municipio
  ubicacion: string; // Ubicación geográfica o descriptiva
  caracteristicas: string; // Detalles o características adicionales
}

// Interfaz extendida que agrega propiedades opcionales para la edición
interface MunicipioEditable extends Municipio {
  editando?: boolean; // Indica si el municipio está en modo de edición
  index?: number; // Índice del municipio en la lista
}

@Component({
  selector: 'app-tab3', // Selector utilizado en la plantilla HTML
  templateUrl: './tab3.page.html', // Ruta del archivo HTML asociado
  styleUrls: ['./tab3.page.scss'], // Ruta del archivo SCSS asociado
})
export class Tab3Page implements OnInit {
  // Lista de municipios registrados
  municipios: Municipio[] = [];

  // Objeto que representa el formulario del municipio actual
  municipio: MunicipioEditable = this.nuevoMunicipio();

  // Constructor que inyecta el controlador de Toast para mensajes
  constructor(private toastController: ToastController) {}

  // Método de ciclo de vida Angular: ejecutado al iniciar el componente
  ngOnInit() {
    this.cargarMunicipiosDesdeLocalStorage(); // Cargar municipios guardados
    this.municipio = this.nuevoMunicipio(); // Inicializar un nuevo municipio
  }

  // Carga los municipios almacenados en localStorage
  cargarMunicipiosDesdeLocalStorage() {
    const municipiosGuardados = localStorage.getItem('municipios');
    if (municipiosGuardados) {
      this.municipios = JSON.parse(municipiosGuardados); // Convierte JSON a objeto
    }
  }

  // Guarda la lista de municipios en localStorage y sessionStorage
  guardarMunicipiosEnLocalStorage() {
    const municipiosJSON = JSON.stringify(this.municipios); // Convierte objeto a JSON
    localStorage.setItem('municipios', municipiosJSON);
    sessionStorage.setItem('municipios', municipiosJSON); // Respaldo adicional
  }

  // Genera un nuevo objeto MunicipioEditable con un ID único
  nuevoMunicipio(): MunicipioEditable {
    const municipiosGuardados = localStorage.getItem('municipios');
    let maxId = 0;

    if (municipiosGuardados) {
      const municipios = JSON.parse(municipiosGuardados) as Municipio[];
      maxId = municipios.length > 0 ? Math.max(...municipios.map(m => m.id)) : 0;
    }

    return {
      id: maxId + 1, // Asigna un ID incrementado
      nombre: '',
      ubicacion: '',
      caracteristicas: '',
    };
  }

  // Guarda un municipio en la lista (nuevo o actualizado)
  guardarMunicipio() {
    if (this.municipio.nombre.trim() !== '') { // Verifica si el nombre no está vacío
      if (this.municipio.editando) {
        // Modo edición: actualiza un municipio existente
        const index = this.municipio.index;
        if (index !== undefined) {
          const municipioActualizado: Municipio = {
            id: this.municipio.id,
            nombre: this.municipio.nombre,
            ubicacion: this.municipio.ubicacion,
            caracteristicas: this.municipio.caracteristicas,
          };
          this.municipios[index] = municipioActualizado; // Reemplaza en la lista
        }
      } else {
        // Modo nuevo: agrega el municipio a la lista
        this.municipios.push({ ...this.municipio });
      }

      this.guardarMunicipiosEnLocalStorage(); // Actualiza almacenamiento
      this.municipio = this.nuevoMunicipio(); // Reinicia el formulario
    } else {
      this.mostrarToast('Por favor, completa el nombre del municipio'); // Muestra mensaje
    }
  }

  // Carga un municipio en modo edición
  editarMunicipio(index: number) {
    this.municipio = { 
      ...this.municipios[index], // Copia los datos del municipio
      editando: true, // Habilita el modo edición
      index // Guarda el índice para referencias
    };
  }

  // Elimina un municipio de la lista
  eliminarMunicipio(index: number) {
    this.municipios.splice(index, 1); // Elimina por índice
    this.guardarMunicipiosEnLocalStorage(); // Actualiza almacenamiento
  }

  // Cancela la operación actual y reinicia el formulario
  cancelar() {
    this.municipio = this.nuevoMunicipio(); // Restablece a un nuevo municipio
  }

  // Muestra un mensaje tipo toast en la interfaz
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje, // Texto del mensaje
      duration: 2000, // Duración del toast en milisegundos
      color: 'warning', // Estilo de advertencia
    });
    toast.present(); // Presenta el toast en la pantalla
  }
}

