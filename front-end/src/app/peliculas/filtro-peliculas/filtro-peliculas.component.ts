import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from '../../generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService) { }

  form: FormGroup;

  generos: generoDTO[] = [];

  peliculas: PeliculaDTO[];

  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  formOriginal = {
    nombre: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe(generos => {
        this.generos = generos;

        this.form = this.formBuilder.group(this.formOriginal);
        this.leerValoresURL();
        this.buscarPeliculas(this.form.value);

        this.form.valueChanges
          .subscribe(valores => {
            this.buscarPeliculas(valores);
            this.escribirParamsBusquedaEnUrl();
          })
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

    if (valoresForm.nombre) {
      queryStrings.push(`nombre=${valoresForm.nombre}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const objeto: any = {};

      if (params.nombre) {
        objeto.nombre = params.nombre;
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
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
    this.peliculasService.filtrar(valores).subscribe(response => {
      this.peliculas = response.body;
      this.escribirParamsBusquedaEnUrl();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    })

  }

  limpiar() {
    this.form.patchValue(this.formOriginal);
  }

  paginatorUpdate(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }
}
