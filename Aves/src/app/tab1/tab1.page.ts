import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  // Ejemplo de los datos que se mostrarán en la tabla
  aves = [
    {
      descripcion: 'Ave pequeña con alas de colores brillantes',
      especie: 'Avestruz',
      raza: 'Raza X',
      habitat: 'Bosques tropicales',
      municipio: 'Municipio 1',
      pais: 'Colombia',
      continente: 'América',
      departamento: 'Cundinamarca'
    },
    {
      descripcion: 'Ave de gran tamaño con pico largo',
      especie: 'Águila Real',
      raza: 'Raza Y',
      habitat: 'Montañas',
      municipio: 'Municipio 2',
      pais: 'Colombia',
      continente: 'América',
      departamento: 'Antioquia'
    }
    // Más registros pueden ir aquí
  ];

  constructor() {}

}
