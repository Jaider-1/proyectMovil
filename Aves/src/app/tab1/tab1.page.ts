import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // Especificamos el tipo del arreglo como un array de objetos con las propiedades adecuadas
  birds: { commonName: string; scientificName: string; photo: string }[] = [];
  searchTerm: string = '';
  newBird: { commonName: string; scientificName: string; photo: string } = {
    commonName: '',
    scientificName: '',
    photo: '',
  };

  constructor() {}

  ngOnInit() {
    // Cargar aves desde el LocalStorage al iniciar
    const savedBirds = localStorage.getItem('birds');
    if (savedBirds) {
      this.birds = JSON.parse(savedBirds); // Convierte el string almacenado a un array
    }
  }

  get filteredBirds() {
    const term = this.searchTerm.toLowerCase();
    return this.birds.filter(
      (bird) =>
        bird.commonName.toLowerCase().includes(term) ||
        bird.scientificName.toLowerCase().includes(term)
    );
  }

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

  addBird() {
    if (this.newBird.commonName && this.newBird.scientificName && this.newBird.photo) {
      this.birds.push({ ...this.newBird });
      this.newBird = { commonName: '', scientificName: '', photo: '' };

      // Guardar la lista de aves en LocalStorage
      localStorage.setItem('birds', JSON.stringify(this.birds));
      alert('¡Ave añadida exitosamente!');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
