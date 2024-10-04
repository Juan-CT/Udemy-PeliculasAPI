import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';

import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: generoCreacionDTO;

  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }]
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(): string {
    let campo = this.form.get('nombre');

    if (campo.hasError('required')) {
      return 'El nombre es requerido';
    }

    if (campo.hasError('minlength')) {
      return 'La longitud mínima es de 3 caracteres';
    }

    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

}
