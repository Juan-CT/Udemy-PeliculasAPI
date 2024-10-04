import { Component} from '@angular/core';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent{

  constructor(private actoresSevice: ActoresService, private router: Router) { }

  errores: string[] = [];

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresSevice.crear(actor)
      .subscribe(() => {
        this.router.navigate(['/actores'])
      }, errores => this.errores = parsearErroresAPI(errores));
  }
}
