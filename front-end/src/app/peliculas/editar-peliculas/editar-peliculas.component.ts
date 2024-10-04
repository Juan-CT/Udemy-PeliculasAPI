import { Component, OnInit } from '@angular/core';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-peliculas',
  templateUrl: './editar-peliculas.component.html',
  styleUrls: ['./editar-peliculas.component.css']
})
export class EditarPeliculasComponent implements OnInit {

  constructor() { }

  modelo: peliculaDTO;

  ngOnInit(): void {
  }

  guardarCambios(pelicula: peliculaCreacionDTO) {

  }
}
