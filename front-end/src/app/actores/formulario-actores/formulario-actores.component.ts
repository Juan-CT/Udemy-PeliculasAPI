import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  modelo: actorDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        { validators: [Validators.required]

        },
      ],
      fechaNacimiento: '',
      foto: ''
    });

    if (this.modelo !== undefined) this.form.patchValue(this.modelo);
  }

  archivoSeleccionado(file) {
    this.form.get('foto').setValue(file);
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }

}
