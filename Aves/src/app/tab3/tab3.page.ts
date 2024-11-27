// tab3.page.ts
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Interfaz extendida para manejar estado de edición
interface MunicipioEditable extends Municipio {
  editando?: boolean;
  index?: number;
}

interface Municipio {
  id: number;
  nombre: string;
  ubicacion: string;
  caracteristicas: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  municipios: Municipio[] = [];
  municipio: MunicipioEditable = this.nuevoMunicipio();

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    // Cargar municipios desde localStorage al iniciar
    this.cargarMunicipiosDesdeLocalStorage();
    // Generar un nuevo municipio con el ID correcto
    this.municipio = this.nuevoMunicipio();
  }

  cargarMunicipiosDesdeLocalStorage() {
    const municipiosGuardados = localStorage.getItem('municipios');
    if (municipiosGuardados) {
      this.municipios = JSON.parse(municipiosGuardados);
    }
  }

  guardarMunicipiosEnLocalStorage() {
    localStorage.setItem('municipios', JSON.stringify(this.municipios));
    // También guardar en sessionStorage
    sessionStorage.setItem('municipios', JSON.stringify(this.municipios));
  }

  nuevoMunicipio(): MunicipioEditable {
    // Obtiene los municipios del almacenamiento local
    const municipiosGuardados = localStorage.getItem('municipios');
    let maxId = 0;

    if (municipiosGuardados) {
      const municipios = JSON.parse(municipiosGuardados) as Municipio[];
      // Busca el ID más alto entre los municipios guardados
      maxId = municipios.length > 0 ? Math.max(...municipios.map(m => m.id)) : 0;
    }

    return {
      id: maxId + 1, // Incrementa el ID más alto encontrado
      nombre: '',
      ubicacion: '',
      caracteristicas: '',
    };
  }

  guardarMunicipio() {
    if (this.municipio.nombre.trim() !== '') {
      if (this.municipio.editando) {
        // Editar municipio existente
        const index = this.municipio.index;
        if (index !== undefined) {
          // Crear un nuevo objeto sin las propiedades de edición
          const municipioActualizado: Municipio = {
            id: this.municipio.id,
            nombre: this.municipio.nombre,
            ubicacion: this.municipio.ubicacion,
            caracteristicas: this.municipio.caracteristicas,
          };

          this.municipios[index] = municipioActualizado;
        }
      } else {
        // Agregar nuevo municipio
        const nuevoMunicipio: Municipio = { ...this.municipio };
        this.municipios.push(nuevoMunicipio);
      }

      // Guardar en almacenamiento local
      this.guardarMunicipiosEnLocalStorage();

      // Reiniciar formulario
      this.municipio = this.nuevoMunicipio();
    } else {
      // Mostrar toast
      this.mostrarToast('Por favor, completa el nombre del municipio');
    }
  }

  editarMunicipio(index: number) {
    this.municipio = { 
      ...this.municipios[index], 
      editando: true, 
      index 
    };
  }

  eliminarMunicipio(index: number) {
    this.municipios.splice(index, 1);
    // Actualizar almacenamiento local después de eliminar
    this.guardarMunicipiosEnLocalStorage();
  }

  cancelar() {
    this.municipio = this.nuevoMunicipio();
  }

  // Método para mostrar toast
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }
}
