import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-formulario-peliculas',
  templateUrl: './formulario-peliculas.component.html',
  styleUrls: ['./formulario-peliculas.component.css']
})
export class FormularioPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  modelo: PeliculaDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: multipleSelectorModel[];

  @Input()
  generosSeleccionados: multipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: multipleSelectorModel[];

  @Input()
  cinesSeleccionados: multipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '', {
          validators: [Validators.required]
        }
      ],
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    if (this.modelo !== undefined) this.form.patchValue(this.modelo);
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map(valor => {
      return {id: valor.id, personaje: valor.personaje}
    });
    this.form.get('actores').setValue(actores);
    if (!this.imagenCambiada) {this.form.patchValue({'poster': null});}

    this.onSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

}
