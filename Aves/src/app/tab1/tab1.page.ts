import { Component } from '@angular/core';

// Definimos la interfaz para el tipo de ave
interface Ave {
  codigo: string;
  nombreComun: string;
  nombreCientifico: string;
  raza: string;
  habitat: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  // Lista de aves con el tipo correctamente definido
  aves: Ave[] = [];  // Especificamos que aves es un array de tipo Ave

  isFormOpen = false;

  // Inicializamos el formulario con los campos vacíos
  form: Ave = {
    codigo: '',
    nombreComun: '',
    nombreCientifico: '',
    raza: '',
    habitat: '',
  };

  constructor() {
    this.loadAves();  // Cargar aves desde localStorage al inicializar
  }

  // Cargar aves desde el localStorage
  loadAves() {
    const avesStored = localStorage.getItem('aves');
    if (avesStored) {
      this.aves = JSON.parse(avesStored);  // Asignar los datos almacenados a aves
    }
  }

  // Guardar aves en el localStorage
  saveAves() {
    localStorage.setItem('aves', JSON.stringify(this.aves));  // Guardar la lista de aves
  }

  // Abrir el formulario de agregar ave
  openForm() {
    this.isFormOpen = true;
    this.form = {
      codigo: '',
      nombreComun: '',
      nombreCientifico: '',
      raza: '',
      habitat: '',
    };
  }

  // Cerrar el formulario sin guardar
  closeForm() {
    this.isFormOpen = false;
  }

  // Guardar una nueva ave o editar una existente
  saveAve() {
    if (this.form.codigo && this.form.nombreComun && this.form.nombreCientifico && this.form.raza && this.form.habitat) {
      const existingIndex = this.aves.findIndex(ave => ave.codigo === this.form.codigo);

      if (existingIndex === -1) {
        // Nueva ave, la agregamos al array
        this.aves.push({ ...this.form });
      } else {
        // Ave existente, la actualizamos
        this.aves[existingIndex] = { ...this.form };
      }

      this.saveAves();  // Guardar en localStorage
      this.closeForm(); // Cerrar formulario
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  // Editar ave
  editAve(index: number) {
    this.form = { ...this.aves[index] };  // Cargar los datos de la ave en el formulario
    this.isFormOpen = true;
  }

  // Eliminar ave
  deleteAve(index: number) {
    this.aves.splice(index, 1);  // Eliminar el elemento del array
    this.saveAves();  // Actualizar el localStorage
  }
}
