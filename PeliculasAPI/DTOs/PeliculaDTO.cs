using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace PeliculasAPI.DTOs
{
    public class PeliculaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public string Trailer { get; set; }
        public string Poster { get; set; }
        public List<GeneroDTO> Generos { get; set; }
        public List<PeliculaActorDTO> Actores { get; set; }
        public List<CineDTO> Cines { get; set; }
    }
}
