import { Component } from '@angular/core';

// Define la interfaz Ave para estructurar los datos de las aves.
// Esto asegura consistencia en las propiedades esperadas.
interface Ave {
  codigo: string;             // Identificador único del ave
  nombreComun: string;        // Nombre coloquial del ave
  nombreCientifico: string;   // Denominación científica del ave
  especie: string;            // Especie a la que pertenece el ave
  habitat: string;            // Entorno natural del ave
  municipio: string;          // Localización del ave (municipio)
}

@Component({
  selector: 'app-tab1',               // Selector del componente para el DOM
  templateUrl: './tab1.page.html',    // Ruta del archivo de plantilla HTML asociado
  styleUrls: ['./tab1.page.scss'],    // Ruta del archivo de estilos SCSS asociado
})
export class Tab1Page {
  // Modelo principal para almacenar la lista de aves gestionadas
  aves: Ave[] = [];

  // Bandera que controla la visibilidad del formulario
  isFormOpen = false;

  // Modelo del formulario inicializado con valores vacíos
  form: Ave = {
    codigo: '',
    nombreComun: '',
    nombreCientifico: '',
    especie: '',
    habitat: '',
    municipio: '',
  };

  // Listas auxiliares para los datos relacionados con especies, hábitats y municipios.
  // Estos datos se cargan dinámicamente desde el almacenamiento local.
  especies: any[] = [];
  habitats: any[] = [];
  municipios: any[] = [];

  // Constructor: Inicializa el componente cargando datos persistentes desde localStorage
  constructor() {
    this.loadAves();        // Carga la lista de aves almacenadas previamente
    this.loadEspecies();    // Carga las especies disponibles
    this.loadHabitats();    // Carga los hábitats disponibles
    this.loadMunicipios();  // Carga los municipios disponibles
  }

  // Método para cargar datos de aves desde localStorage
  // Verifica si existen datos previos y los parsea; de lo contrario, inicializa un arreglo vacío.
  loadAves() {
    const avesStored = localStorage.getItem('aves');
    if (avesStored) {
      this.aves = JSON.parse(avesStored); // Convertir el string almacenado a un objeto JSON
    }
  }

  // Método para persistir la lista de aves en localStorage
  // Convierte la lista actual en una cadena JSON y la almacena.
  saveAves() {
    localStorage.setItem('aves', JSON.stringify(this.aves));
  }

  // Método para cargar las especies desde localStorage
  // Si no hay datos, inicializa la lista como un arreglo vacío.
  loadEspecies() {
    const especiesStored = localStorage.getItem('especies');
    this.especies = especiesStored ? JSON.parse(especiesStored) : [];
  }

  // Método para cargar hábitats desde localStorage
  // Verifica si los datos existen antes de asignar valores a la lista.
  loadHabitats() {
    const habitatsStored = localStorage.getItem('datosHabitat');
    this.habitats = habitatsStored ? JSON.parse(habitatsStored) : [];
  }

  // Método para cargar municipios desde localStorage
  // Inicializa la lista con datos previos o vacíos.
  loadMunicipios() {
    const municipiosStored = localStorage.getItem('municipios');
    this.municipios = municipiosStored ? JSON.parse(municipiosStored) : [];
  }

  // Método para abrir el formulario
  // Resetea el modelo del formulario y habilita su visualización.
  openForm() {
    this.isFormOpen = true; // Activa la bandera para mostrar el formulario
    this.form = {           // Inicializa los valores del formulario
      codigo: '',
      nombreComun: '',
      nombreCientifico: '',
      especie: '',
      habitat: '',
      municipio: '',
    };
  }

  // Método para cerrar el formulario
  // Cambia la bandera para ocultar el formulario.
  closeForm() {
    this.isFormOpen = false;
  }

  // Método para guardar un nuevo registro o actualizar uno existente
  saveAve() {
    // Validación: verifica que todos los campos del formulario estén completos.
    if (
      this.form.codigo &&
      this.form.nombreComun &&
      this.form.nombreCientifico &&
      this.form.especie &&
      this.form.habitat &&
      this.form.municipio
    ) {
      // Busca si el ave ya existe en la lista mediante el código único.
      const existingIndex = this.aves.findIndex(ave => ave.codigo === this.form.codigo);

      if (existingIndex === -1) {
        // Si no existe, lo agrega al arreglo de aves
        this.aves.push({ ...this.form });
      } else {
        // Si existe, reemplaza los datos existentes con los nuevos
        this.aves[existingIndex] = { ...this.form };
      }

      this.saveAves(); // Persistencia: Guarda los cambios en localStorage
      this.closeForm(); // Cierra el formulario tras guardar
    } else {
      // Si la validación falla, alerta al usuario
      alert('Por favor complete todos los campos');
    }
  }

  // Método para editar un ave existente
  // Carga los datos de la ave seleccionada en el modelo del formulario.
  editAve(index: number) {
    this.form = { ...this.aves[index] }; // Clona los datos del ave para evitar referencias directas
    this.isFormOpen = true; // Abre el formulario en modo de edición
  }

  // Método para eliminar un registro del arreglo de aves
  deleteAve(index: number) {
    this.aves.splice(index, 1); // Elimina el elemento del arreglo usando su índice
    this.saveAves();           // Actualiza el almacenamiento local
  }
}
