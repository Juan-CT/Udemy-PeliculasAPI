import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO } from '../cine';
import { Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent implements OnInit {

  errores: string[] = [];

  constructor(private router: Router, private cinesService: CinesService) { }

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cinesService.crear(cine)
      .subscribe(() => {
        this.router.navigate(['/cines']);
      }, errores => this.errores = parsearErroresAPI(errores));
  }
}
