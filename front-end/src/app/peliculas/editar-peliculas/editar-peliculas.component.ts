import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-editar-peliculas',
  templateUrl: './editar-peliculas.component.html',
  styleUrls: ['./editar-peliculas.component.css']
})
export class EditarPeliculasComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activatedroute: ActivatedRoute,
    private router: Router) { }

  modelo: PeliculaDTO;
  generosNoSeleccionados: multipleSelectorModel[];
  generosSeleccionados: multipleSelectorModel[];
  cinesNoSeleccionados: multipleSelectorModel[];
  cinesSeleccionados: multipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activatedroute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <multipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <multipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cine => {
          return <multipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        });

        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cine => {
          return <multipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;
      })
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.editar(this.modelo.id, pelicula)
      .subscribe(() => this.router.navigate(['/peliculas/' + this.modelo.id]));
  }
}
