import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';

@Component({
  selector: 'app-formulario-peliculas',
  templateUrl: './formulario-peliculas.component.html',
  styleUrls: ['./formulario-peliculas.component.css']
})
export class FormularioPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  modelo: peliculaDTO;

  @Output()
  onSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: multipleSelectorModel[];

  generosSeleccionados: multipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: multipleSelectorModel[];

  cinesSeleccionados: multipleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '', {
          validators: [Validators.required]
        }
      ],
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosId: '',
      cinesId: ''
    });

    if (this.modelo !== undefined) this.form.patchValue(this.modelo);
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesId').setValue(cinesIds);

    this.onSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('poster').setValue(archivo);
  }

}
