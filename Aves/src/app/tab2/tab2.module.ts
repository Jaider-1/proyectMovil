// Importación de los módulos necesarios para configurar este módulo en Angular e Ionic.
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic para usar sus componentes y directivas.
import { NgModule } from '@angular/core'; // Importa NgModule para definir el módulo de Angular.
import { CommonModule } from '@angular/common'; // Proporciona funcionalidades comunes de Angular, como directivas de estructura.
import { FormsModule } from '@angular/forms'; // Permite el uso de formularios en Angular, como el enlace bidireccional (ngModel).
import { Tab2Page } from './tab2.page'; // Importa el componente Tab2Page que se va a declarar y usar en este módulo.
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; // Importa el módulo de un componente adicional (ExploreContainer) que podría ser utilizado en Tab2Page.

import { Tab2PageRoutingModule } from './tab2-routing.module'; // Importa el módulo de rutas que se configuró previamente para Tab2Page.

// Declaración del módulo Tab2PageModule
@NgModule({
  imports: [
    // Aquí se incluyen los módulos que se van a usar dentro de este módulo.
    IonicModule, // Se importa IonicModule para poder usar componentes y directivas de Ionic.
    CommonModule, // Se importa CommonModule para las directivas comunes de Angular, como ngIf y ngFor.
    FormsModule, // Se importa FormsModule para permitir el uso de formularios y vinculación de datos en las vistas.
    ExploreContainerComponentModule, // Se importa el módulo de ExploreContainer para utilizar sus componentes.
    Tab2PageRoutingModule // Se importa el módulo de rutas para configurar las rutas específicas de Tab2Page.
  ],
  declarations: [Tab2Page] // Aquí se declara el componente que pertenece a este módulo (Tab2Page).
})
export class Tab2PageModule {} // Exporta el módulo Tab2PageModule para que pueda ser utilizado en otras partes de la aplicación.
