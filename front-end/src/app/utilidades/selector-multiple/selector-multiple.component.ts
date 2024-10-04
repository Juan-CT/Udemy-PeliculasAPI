import { Component, Input, OnInit } from '@angular/core';
import { multipleSelectorModel } from './multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  seleccionados: multipleSelectorModel[] = [];

  @Input()
  noSeleccionados: multipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  seleccionar(item: multipleSelectorModel, index: number) {
    this.seleccionados.push(item);
    this.noSeleccionados.splice(index, 1);
  }

  deseleccionar(item: multipleSelectorModel, index: number) {
    this.noSeleccionados.push(item);
    this.seleccionados.splice(index, 1);
  }

  seleccionarTodo(){
    this.seleccionados.push(...this.noSeleccionados);
    this.noSeleccionados = [];
  }

  deSeleccionarTodo(){
    this.noSeleccionados.push(...this.seleccionados);
    this.seleccionados = [];
  }
}
