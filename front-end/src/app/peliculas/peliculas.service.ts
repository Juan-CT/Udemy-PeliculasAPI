import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGet, PeliculaPutGet } from './pelicula';
import { formatearFecha } from '../utilidades/utilidades';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + 'api/peliculas';

  public postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postget`);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<number> {
    const formData = this.construirFormData(pelicula);
    return this.http.post<number>(this.apiURL, formData);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', pelicula.nombre);
    formData.append('enCines', String(pelicula.enCines));
    formData.append('trailer', pelicula.trailer);
    if (pelicula.fechaLanzamiento) formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento));
    if (pelicula.poster) formData.append('poster', pelicula.poster);
    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }

  public obtenerPorId(id: number): Observable<PeliculaDTO> {
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerLandingPage(): Observable<LandingPageDTO> {
    return this.http.get<LandingPageDTO>(`${this.apiURL}`);
  }

  public putGet(id: number): Observable<PeliculaPutGet> {
    return this.http.get<PeliculaPutGet>(`${this.apiURL}/putget/${id}`);
  }

  public editar(id: number, pelicula: PeliculaCreacionDTO) {
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public filtrar(valores: any): Observable<any> {
    const params = new HttpParams({fromObject: valores});
    return this.http.get<PeliculaDTO[]>(`${this.apiURL}/filtrar`, {params, observe: 'response'});
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
