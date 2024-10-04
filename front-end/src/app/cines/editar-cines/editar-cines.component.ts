import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-cines',
  templateUrl: './editar-cines.component.html',
  styleUrls: ['./editar-cines.component.css']
})
export class EditarCinesComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private cinesService: CinesService) { }

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.cinesService.obtenerPorId(params.id)
        .subscribe(cine => {
          this.modelo = cine;
        }, () => this.router.navigate(['/cines']))
    })
  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cinesService.editar(this.modelo.id, cine)
    .subscribe(() => {
      this.router.navigate(['/cines']);
    }, errores => this.errores = parsearErroresAPI(errores));
  }
}
