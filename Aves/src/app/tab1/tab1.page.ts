import { Component } from '@angular/core';

@Component({
  selector: 'app-aves',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.sccs'],
})
export class AvesPage {
  // Listado de aves
  aves: { id: number; nombreComun: string; nombreCientifico: string }[] = [
    { id: 1, nombreComun: 'Colibrí', nombreCientifico: 'Trochilidae' },
    { id: 2, nombreComun: 'Cóndor', nombreCientifico: 'Vultur gryphus' },
  ];

  // Nueva ave para agregar
  nuevoAve = {
    nombreComun: '',
    nombreCientifico: '',
  };

  mostrarFormulario = false;

  constructor() {}

  // Abre el formulario modal
  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  // Cierra el formulario modal
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.limpiarFormulario();
  }

  // Agrega un nuevo ave al listado
  agregarAve() {
    if (this.nuevoAve.nombreComun && this.nuevoAve.nombreCientifico) {
      const nuevoId = this.aves.length > 0 ? this.aves[this.aves.length - 1].id + 1 : 1;
      this.aves.push({
        id: nuevoId,
        nombreComun: this.nuevoAve.nombreComun,
        nombreCientifico: this.nuevoAve.nombreCientifico,
      });
      this.cerrarFormulario();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  // Limpia los datos del formulario
  limpiarFormulario() {
    this.nuevoAve = {
      nombreComun: '',
      nombreCientifico: '',
    };
  }
}
