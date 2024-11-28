import { Component } from '@angular/core';

interface Ave {
  codigo: string;
  nombreComun: string;
  nombreCientifico: string;
  especie: string;
  habitat: string;
  municipio: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  aves: Ave[] = [];
  isFormOpen = false;

  form: Ave = {
    codigo: '',
    nombreComun: '',
    nombreCientifico: '',
    especie: '',
    habitat: '',
    municipio: '',
  };

  especies: any[] = [];
  habitats: any[] = [];
  municipios: any[] = [];

  constructor() {
    this.loadAves();
    this.loadEspecies();
    this.loadHabitats();
    this.loadMunicipios();
  }

  loadAves() {
    const avesStored = localStorage.getItem('aves');
    if (avesStored) {
      this.aves = JSON.parse(avesStored);
    }
  }

  saveAves() {
    localStorage.setItem('aves', JSON.stringify(this.aves));
  }

  loadEspecies() {
    const especiesStored = localStorage.getItem('especies');
    this.especies = especiesStored ? JSON.parse(especiesStored) : [];
  }

  loadHabitats() {
    const habitatsStored = localStorage.getItem('datosHabitat');
    this.habitats = habitatsStored ? JSON.parse(habitatsStored) : [];
  }

  loadMunicipios() {
    const municipiosStored = localStorage.getItem('municipios');
    this.municipios = municipiosStored ? JSON.parse(municipiosStored) : [];
  }

  openForm() {
    this.isFormOpen = true;
    this.form = {
      codigo: '',
      nombreComun: '',
      nombreCientifico: '',
      especie: '',
      habitat: '',
      municipio: '',
    };
  }

  closeForm() {
    this.isFormOpen = false;
  }

  saveAve() {
    if (this.form.codigo && this.form.nombreComun && this.form.nombreCientifico && this.form.especie && this.form.habitat && this.form.municipio) {
      const existingIndex = this.aves.findIndex(ave => ave.codigo === this.form.codigo);

      if (existingIndex === -1) {
        this.aves.push({ ...this.form });
      } else {
        this.aves[existingIndex] = { ...this.form };
      }

      this.saveAves();
      this.closeForm();
    } else {
      alert('Por favor complete todos los campos');
    }
  }

  editAve(index: number) {
    this.form = { ...this.aves[index] };
    this.isFormOpen = true;
  }

  deleteAve(index: number) {
    this.aves.splice(index, 1);
    this.saveAves();
  }
}
