import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // Lista de aves
  birds = [
    {
      commonName: 'Colibrí',
      scientificName: 'Trochilidae',
      photo: 'https://via.placeholder.com/100',
    },
    {
      commonName: 'Águila',
      scientificName: 'Aquila chrysaetos',
      photo: 'https://via.placeholder.com/100',
    },
  ];

  // Término de búsqueda
  searchTerm: string = '';

  // Nueva ave que se añadirá
  newBird = {
    commonName: '',
    scientificName: '',
    photo: '',
  };

  /**
   * Filtra las aves por nombre común o científico
   * @returns Lista de aves filtradas
   */
  get filteredBirds() {
    const term = this.searchTerm.toLowerCase();
    return this.birds.filter(
      (bird) =>
        bird.commonName.toLowerCase().includes(term) ||
        bird.scientificName.toLowerCase().includes(term)
    );
  }

  /**
   * Maneja la selección de un archivo de imagen
   * @param event Evento del input de tipo file
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newBird.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Añade una nueva ave a la lista
   */
  addBird() {
    if (this.newBird.commonName && this.newBird.scientificName && this.newBird.photo) {
      this.birds.push({ ...this.newBird });
      this.newBird = { commonName: '', scientificName: '', photo: '' }; // Limpia el formulario
      alert('¡Ave añadida exitosamente!');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
