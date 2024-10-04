import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cineCreacionDTO } from '../cine';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-cines',
  templateUrl: './formulario-cines.component.html',
  styleUrls: ['./formulario-cines.component.css']
})

export class FormularioCinesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  modelo: cineCreacionDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  form: FormGroup;

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

  guardarCambios(){
    this.onSubmit.emit(this.form.value);
  }

}
