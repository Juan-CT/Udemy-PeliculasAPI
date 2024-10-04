import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Acción' },
    { id: 3, nombre: 'Comedia' },
  ];

  peliculas = [
    { titulo: 'Dune', enCines: false, proximosEstrenos: true, generos: [1, 2], poster: 'https://posterspy.com/wp-content/uploads/2021/09/dune-movie-psoter-art-scaled.jpg' },
    { titulo: 'Matrix', enCines: true, proximosEstrenos: false, generos: [1, 2], poster: 'https://picfiles.alphacoders.com/385/385304.jpg' },
    { titulo: 'Inception', enCines: false, proximosEstrenos: false, generos: [1], poster: 'https://posterspy.com/wp-content/uploads/2020/07/Inception_10th_Anniversary_Poster.jpg' },
  ]

  peliculasOriginal = this.peliculas;

  formOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges
      .subscribe(valores => {
        this.peliculas = this.peliculasOriginal;
        this.buscarPeliculas(valores);
        this.escribirParamsBusquedaEnUrl();
      })
  }

  private escribirParamsBusquedaEnUrl(): void {
    const queryStrings = [];

    const valoresForm = this.form.value;

    if (valoresForm.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valoresForm.proximosEstrenos}`);
    }

    if (valoresForm.enCines) {
      queryStrings.push(`enCines=${valoresForm.enCines}`);
    }

    if (valoresForm.generoId != '0') {
      queryStrings.push(`generoId=${valoresForm.generoId}`);
    }

    if (valoresForm.titulo) {
      queryStrings.push(`titulo=${valoresForm.titulo}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const objeto: any = {};

      if (params.titulo) {
        objeto.titulo = params.titulo;
      }

      if (params.generoID) {
        objeto.generoID = Number(params.generoID);
      }

      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines) {
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    })
  }

  buscarPeliculas(valores: any) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar() {
    this.form.patchValue(this.formOriginal);
  }
}
