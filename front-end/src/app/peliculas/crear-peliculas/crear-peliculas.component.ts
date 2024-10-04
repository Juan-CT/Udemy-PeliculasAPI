import { Component, OnInit } from '@angular/core';
import { peliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';

@Component({
  selector: 'app-crear-peliculas',
  templateUrl: './crear-peliculas.component.html',
  styleUrls: ['./crear-peliculas.component.css']
})
export class CrearPeliculasComponent implements OnInit {

  constructor(private peliculasService: PeliculasService) { }

  generosNoSeleccionados: multipleSelectorModel[];
  cinesNoSeleccionados: multipleSelectorModel[];

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

  guardarCambios(pelicula: peliculaCreacionDTO) {

  }


}
