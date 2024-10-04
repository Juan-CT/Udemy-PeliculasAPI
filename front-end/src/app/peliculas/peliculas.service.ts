import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeliculaPostGet } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + 'api/peliculas';

  public postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postget`);
  }
}
