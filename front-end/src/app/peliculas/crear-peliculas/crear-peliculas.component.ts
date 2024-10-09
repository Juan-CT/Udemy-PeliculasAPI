import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-peliculas',
  templateUrl: './crear-peliculas.component.html',
  styleUrls: ['./crear-peliculas.component.css']
})
export class CrearPeliculasComponent implements OnInit {

  constructor(private peliculasService: PeliculasService, private router: Router) { }

  generosNoSeleccionados: multipleSelectorModel[];
  cinesNoSeleccionados: multipleSelectorModel[];

  errores: string[] = [];

  ngOnInit(): void {
    this.peliculasService.postGet()
      .subscribe(resultado => {
        this.generosNoSeleccionados = resultado.generos.map(genero => {
          return <multipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.cinesNoSeleccionados = resultado.cines.map(cine => {
          return <multipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        });

      }, error => console.error(error));
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.crear(pelicula)
      .subscribe((id: number) => this.router.navigate(['/pelicula/'+ id]),
    error => this.errores = parsearErroresAPI(error));
  }


}
