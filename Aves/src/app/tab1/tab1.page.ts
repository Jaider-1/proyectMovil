import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  // Lista de aves
  birds = [
    { id: 1, commonName: 'Colibrí', scientificName: 'Trochilidae' },
    { id: 2, commonName: 'Cóndor Andino', scientificName: 'Vultur gryphus' },
    { id: 3, commonName: 'Pato Mallard', scientificName: 'Anas platyrhynchos' },
    { id: 4, commonName: 'Águila Real', scientificName: 'Aquila chrysaetos' },
  ];

  constructor() {}
}
