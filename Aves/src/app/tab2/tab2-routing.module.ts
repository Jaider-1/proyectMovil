// Importación de los módulos necesarios de Angular.
import { NgModule } from '@angular/core'; // NgModule es utilizado para definir un módulo de Angular.
import { RouterModule, Routes } from '@angular/router'; // RouterModule permite la configuración de rutas en Angular, y Routes define las rutas específicas.
import { Tab2Page } from './tab2.page'; // Se importa el componente de la página Tab2, que es donde se manejará la vista asociada a esta ruta.

// Definición de las rutas que estarán disponibles en esta sección del módulo.
const routes: Routes = [
  {
    path: '', // Ruta raíz (vacía), es decir, cuando el usuario accede a la ruta asociada a este módulo sin especificar un camino adicional.
    component: Tab2Page, // El componente que se renderizará cuando se acceda a la ruta definida.
  }
];

// Declaración del módulo de rutas para el componente Tab2Page.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Configuración de las rutas para este módulo, usando `forChild` porque este es un módulo de rutas hijo.
  exports: [RouterModule] // Exportación del RouterModule para que otras partes de la aplicación puedan acceder a la configuración de las rutas.
})
export class Tab2PageRoutingModule {} // Se exporta el módulo que contiene la configuración de las rutas de la página Tab2.
