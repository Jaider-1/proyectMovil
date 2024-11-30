// Importación de módulos necesarios para las pruebas unitarias en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing'; // ComponentFixture y TestBed se utilizan para configurar y crear el componente para pruebas.
import { IonicModule } from '@ionic/angular'; // Módulo necesario para pruebas con Ionic, proporciona funcionalidades específicas de Ionic.

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; // Importa el módulo de otro componente relacionado que se necesita en la prueba.

import { Tab2Page } from './tab2.page'; // Importa el componente Tab2Page que se va a probar.

describe('Tab2Page', () => { // Describe el conjunto de pruebas para el componente Tab2Page.
  let component: Tab2Page; // Variable para almacenar la instancia del componente.
  let fixture: ComponentFixture<Tab2Page>; // Variable para la instancia del fixture que se usa para interactuar con el componente en las pruebas.

  // Antes de ejecutar cada prueba, configura el entorno de pruebas y crea el componente.
  beforeEach(async () => {
    await TestBed.configureTestingModule({ // Configura el módulo de pruebas con las declaraciones e importaciones necesarias.
      declarations: [Tab2Page], // Declara el componente que se va a probar.
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule] // Importa los módulos necesarios para la prueba, incluyendo IonicModule y cualquier módulo adicional requerido.
    }).compileComponents(); // Compila los componentes importados para que estén listos para su prueba.

    // Crea la instancia del componente y la configuración del fixture.
    fixture = TestBed.createComponent(Tab2Page); // Crea el componente para la prueba.
    component = fixture.componentInstance; // Asigna el componente a la variable.
    fixture.detectChanges(); // Realiza la detección de cambios para asegurarse de que el componente esté listo para interactuar en la prueba.
  });

  // Prueba que verifica si el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente haya sido creado exitosamente (no sea nulo o indefinido).
  });
});
