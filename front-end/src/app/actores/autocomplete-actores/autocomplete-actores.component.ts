import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl;

  actores = [
    { nombre: 'Tom Holland', personaje: '',foto: 'https://ih1.redbubble.net/image.209039883.1334/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg'},
    { nombre: 'Tom Hanks', personaje: '',foto: 'https://ih1.redbubble.net/image.209039883.1334/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg'},
    { nombre: 'Samuel L. Jackson', personaje: '',foto: 'https://ih1.redbubble.net/image.209039883.1334/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg'},
  ];

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje','acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1)
    });
  }

  optionSelected(event:MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    this.control.patchValue('');

    if (this.actoresSeleccionados.includes(event.option.value)) return;

    this.actoresSeleccionados.push(event.option.value);

    if (this.table !== undefined) this.table.renderRows();
  }

  eliminar(actor) {
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados
      .findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }
}
