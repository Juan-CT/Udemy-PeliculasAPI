import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  modelo: actorDTO;
  errores: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private actoresService: ActoresService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.actoresService.obtenerPorId(params.id)
        .subscribe(actor => {
          this.modelo = actor;
        }, () => this.router.navigate(['/actores']));
    })
  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.editar(this.modelo.id, actor)
      .subscribe(() => {
        this.router.navigate(['/actores']);
      }, errores => this.errores = parsearErroresAPI(errores));
  }
}
