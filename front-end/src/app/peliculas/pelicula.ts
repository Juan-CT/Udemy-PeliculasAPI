import { cineDTO } from "../cines/cine";
import { generoDTO } from "../generos/genero";

export interface peliculaCreacionDTO{
  nombre: string,
  enCines: boolean,
  fechaLanzamiento: Date,
  trailer: string,
  poster: File
}

export interface peliculaDTO{
  nombre: string,
  enCines: boolean,
  fechaLanzamiento: Date,
  trailer: string,
  poster: string
}

export interface PeliculaPostGet {
  generos: generoDTO[];
  cines: cineDTO[];
}
