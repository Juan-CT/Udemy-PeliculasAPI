import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO, actorDTO } from './actor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatearFecha } from '../utilidades/utilidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = environment.apiURL + 'api/actores';

  constructor(private http: HttpClient) { }

  public crear(actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);

    if (actor.fechaNacimiento) {
      const fechaFormateada = formatearFecha(actor.fechaNacimiento);
      formData.append('fechaNacimiento', fechaFormateada);
    };

    if (actor.foto) {
      formData.append('foto', actor.foto)
    };

    return formData;
  }

  public editar(id: number, actor: actorCreacionDTO) {
    const formData =this.construirFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public obtenerPorId(id: number): Observable<actorDTO> {
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerTodos(pagina: number, cantidadElementosAMostrar: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params})
  }
}
